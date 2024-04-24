import { uiText } from '../lang/ui-text'
import { WRTCFileTransfer } from './file-transfer'

describe('WRTCFileTransfer', () => {
	let readable: ReadableStream
	beforeEach(() => {
		readable = new ReadableStream({
			start(controller) {
				return pump()
				function pump() {
					controller.enqueue(new Uint8Array([0, 1, 0, 1, 0, 1]))
					controller.enqueue(new Uint8Array([0, 1, 0, 1, 0, 1]))
					controller.enqueue(new Uint8Array([0, 1, 0, 1, 0, 1]))
				}
			},
		})
	})
	test('should be defined', () => {
		expect(WRTCFileTransfer).toBeDefined()
	})

	describe('sendFile', () => {
		test('should be create a data channel', () => {
			const fileTransfer = new WRTCFileTransfer(jest.fn())
			const createChannel = jest.spyOn(fileTransfer, 'createDataChannel')
			fileTransfer.sendFile(new File([], 'test.txt'))
			expect(createChannel).toHaveBeenCalled()
		})

		test('should call handleSendFileMessage when it receives a message', () => {
			const fileTransfer = new WRTCFileTransfer(jest.fn())
			const channel = { onmessage: (ev: unknown) => ev }
			jest.spyOn(fileTransfer, 'createDataChannel').mockReturnValue(
				channel as never,
			)

			const handleSendFileMessage = jest.spyOn(
				fileTransfer,
				'handleSendFileMessages' as never,
			)
			fileTransfer.sendFile(new File([], 'test.txt'))
			expect(handleSendFileMessage).not.toHaveBeenCalled()

			// event
			const ev_channel = {
				send: jest.fn(),
				onbufferedamountlow: jest.fn(),
			} as unknown as RTCDataChannel
			const event = new RTCMessageEvent('message', ev_channel, {
				data: '',
			})

			channel.onmessage(event)
			expect(handleSendFileMessage).toHaveBeenCalled()
		})
	})

	describe('handleSendFileMessages', () => {
		test('should not start until you receive start', async () => {
			const fileTransfer = new WRTCFileTransfer(jest.fn())
			const channel = {
				send: jest.fn(),
				onbufferedamountlow: jest.fn(),
			} as unknown as RTCDataChannel
			const file = new File([''], 'test.txt')
			// Jest doesn't understand file.stream, that's why it is moked
			file.stream = () => readable
			const event = new RTCMessageEvent('message', channel, { data: '' })
			fileTransfer['handleSendFileMessages'](event, file)
			await Promise.resolve(null)
			expect(channel.send).not.toHaveBeenCalled()
		})

		test('should start until you receive start', async () => {
			const fileTransfer = new WRTCFileTransfer(jest.fn())
			// channel
			const channel = {
				send: jest.fn(),
				onbufferedamountlow: jest.fn(),
			} as unknown as RTCDataChannel

			// Event
			const event = new RTCMessageEvent('message', channel, {
				data: 'start',
			})

			// File
			const file = new File([], 'test.txt')
			// Jest doesn't understand file.stream, that's why it is moked
			file.stream = () => readable

			fileTransfer['handleSendFileMessages'](event, file)
			await Promise.resolve(null)
			expect(channel.send).toHaveBeenCalledTimes(1)
		})

		test('should send next file chunk when onbufferedamountlow is called', async () => {
			const fileTransfer = new WRTCFileTransfer(jest.fn())

			const channel = {
				send: jest.fn(),
				onbufferedamountlow: jest.fn(),
			} as unknown as RTCDataChannel

			// Event
			const event = new RTCMessageEvent('message', channel, {
				data: 'start',
			})

			// File
			const file = new File([], 'test.txt')
			// Jest doesn't understand file.stream, that's why it is moked
			file.stream = () => readable

			fileTransfer['handleSendFileMessages'](event, file)
			await Promise.resolve(null)
			channel.onbufferedamountlow?.(event)
			await Promise.resolve(null)
			expect(channel.send).toHaveBeenCalledTimes(2)
		})
	})

	describe('saveFile', () => {
		test('should return undefined when is not a xoukan file message', () => {
			const fileTransfer = new WRTCFileTransfer(jest.fn())
			const file = fileTransfer['saveFile']({
				channel: {
					label: 'test',
				},
			} as RTCMessageEvent<unknown>)
			expect(file).toBeUndefined()
		})

		describe('should call on error is there are not size or name', () => {
			test('size is not an int', () => {
				const onError = jest.fn()
				const fileTransfer = new WRTCFileTransfer(jest.fn(), onError)
				fileTransfer['saveFile']({
					channel: {
						label: 'xoukanFile:size:name',
					},
				} as RTCMessageEvent<unknown>)
				expect(onError).toHaveBeenCalledWith(uiText.invalidTransfer)
			})
			test('size does not exist', () => {
				const onError = jest.fn()
				const fileTransfer = new WRTCFileTransfer(jest.fn(), onError)
				fileTransfer['saveFile']({
					channel: {
						label: 'xoukanFile::name',
					},
				} as RTCMessageEvent<unknown>)
				expect(onError).toHaveBeenCalledWith(uiText.invalidTransfer)
			})
			test('name does not exist', () => {
				const onError = jest.fn()
				const fileTransfer = new WRTCFileTransfer(jest.fn(), onError)
				fileTransfer['saveFile']({
					channel: {
						label: 'xoukanFile:128:',
					},
				} as RTCMessageEvent<unknown>)
				expect(onError).toHaveBeenCalledWith(uiText.invalidTransfer)
			})
		})

		test('should call onNewFile when all is corret', () => {
			const onNewFile = jest.fn()
			const onError = jest.fn()
			const fileTransfer = new WRTCFileTransfer(onNewFile, onError)
			fileTransfer['saveFile']({
				channel: {
					label: 'xoukanFile:1024:mifile.txt',
				},
			} as RTCMessageEvent<unknown>)
			expect(onError).not.toHaveBeenCalled()
			expect(onNewFile).toHaveBeenCalled()
		})
	})
})

class RTCMessageEvent<T> extends MessageEvent<T> {
	channel: RTCDataChannel
	constructor(
		type: string,
		channel: RTCDataChannel,
		eventInitDict?: MessageEventInit<T>,
	) {
		super(type, eventInitDict)
		this.channel = channel
	}
}

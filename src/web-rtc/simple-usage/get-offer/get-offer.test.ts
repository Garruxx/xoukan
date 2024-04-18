/*
 Xoukan Serverless file sharing using webRTC
 Copyright (C) 2024  Jhon Jairo Guerrero Sanchez
 <garruxx@gmail.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import { WRTCConnectType } from '@src/web-rtc/connection/web-rtc-connect'
import { getOffert } from './get-offer'

describe('getOffert', () => {
	test('should be defined', () => {
		expect(getOffert).toBeDefined()
	})

	test('should be create the baseChannel', async () => {
		const wrtcConnect = {
			createDataChannel: jest.fn(() => ({
				onopen: jest.fn(),
			})),
			getLocalConectionStringB64: jest.fn(async () => 'test'),
		} as unknown as WRTCConnectType

		await getOffert(wrtcConnect, jest.fn())
		expect(wrtcConnect.createDataChannel).toHaveBeenCalled()
	})

	test("should be call onConnection with true when it's open", async () => {
		const events = { onOpen: jest.fn() }
		const wrtcConnect = {
			createDataChannel: jest.fn(() => ({
				set onopen(cb: jest.Mock<VoidFunction>) {
					events['onOpen'] = cb
				},
				close: jest.fn(),
			})),
			getLocalConectionStringB64: jest.fn(async () => 'test'),
		} as unknown as WRTCConnectType

		const onConnection = jest.fn()
		await getOffert(wrtcConnect, jest.fn(), onConnection)
		events.onOpen()
		expect(onConnection).toHaveBeenCalledWith(true)
	})
	test("should close the base channel when it's open", async () => {
		const events = { onOpen: jest.fn() }
		const close = jest.fn()
		const wrtcConnect = {
			createDataChannel: jest.fn(() => ({
				set onopen(cb: jest.Mock<VoidFunction>) {
					events['onOpen'] = cb
				},
				close,
			})),
			getLocalConectionStringB64: jest.fn(async () => 'test'),
		} as unknown as WRTCConnectType

		await getOffert(wrtcConnect, jest.fn())
		events.onOpen()
		expect(close).toHaveBeenCalledTimes(1)
	})
	test("should be call onConnection with false when it's closed", async () => {
		const events = { onOpen: jest.fn(), onClose: jest.fn() }
		const close = jest.fn()
		const wrtcConnect = {
			createDataChannel: jest.fn(() => ({
				set onopen(cb: jest.Mock<VoidFunction>) {
					events['onOpen'] = cb
				},
				close,
			})),
			set onclose(cb: jest.Mock<VoidFunction>) {
				events['onClose'] = cb
			},
			getLocalConectionStringB64: jest.fn(async () => 'test'),
		} as unknown as WRTCConnectType
		const onConnection = jest.fn()

		await getOffert(wrtcConnect, jest.fn(), onConnection)
		events.onClose()
		expect(onConnection).toHaveBeenCalledWith(false)
	})

	test('should be call setOffert with the offert is all is ok', async () => {
		const wrtcConnect = {
			createDataChannel: jest.fn(() => ({})),
			getLocalConectionStringB64: jest.fn(async () => 'test'),
		} as unknown as WRTCConnectType
		const setOffert = jest.fn()
		await getOffert(wrtcConnect, setOffert)
		expect(setOffert).toHaveBeenCalledWith('test')
	})
})

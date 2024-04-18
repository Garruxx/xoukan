import { WRTCConnectType } from '@src/web-rtc/connection/web-rtc-connect'
import { setSignal } from './set-signal'

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
describe('setSignal', () => {
	test('should be defined', () => {
		expect(setSignal).toBeDefined()
	})
	test('should be return undefined if the signal has no description', async () => {
		const signal = await setSignal(
			{} as unknown as WRTCConnectType,
			btoa(
				JSON.stringify({
					candidates: [],
				}),
			),
			jest.fn(),
		)
		expect(signal).toBeUndefined()
	})
	test('should be call onError if the signalB64 is not a valid JSON', async () => {
		const onError = jest.fn()
		await setSignal(
			{} as unknown as WRTCConnectType,
			'invalid-signal',
			jest.fn(),
			onError,
		)
		expect(onError).toHaveBeenCalled()
	})

	test('should be add the signal to wrtcConnection', async () => {
		const wrtcConnection = {
			setRemoteSignalB64: jest.fn(),
		} as unknown as WRTCConnectType
		await setSignal(
			wrtcConnection,
			btoa(
				JSON.stringify({
					description: {},
					candidates: [],
				}),
			),
			jest.fn(),
		)
		expect(wrtcConnection.setRemoteSignalB64).toHaveBeenCalled()
	})

	test('should be call setAnswer if the signal type is offert', async () => {
		const wrtcConnection = {
			setRemoteSignalB64: jest.fn(),
			getAnswerB64: jest.fn(() => 'answer test'),
		} as unknown as WRTCConnectType
		const setAnswer = jest.fn()
		await setSignal(
			wrtcConnection,
			btoa(
				JSON.stringify({
					type: 'offer',
					description: {},
					candidates: [],
				}),
			),
			setAnswer,
			jest.fn(),
		)
		expect(wrtcConnection.getAnswerB64).toHaveBeenCalled()
		expect(setAnswer).toHaveBeenCalledWith('answer test')
	})
})

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
import { WRTCConnect } from './web-rtc-connect'

const mockRTCPeerCOnnection = jest.fn()
jest.spyOn(window, 'RTCPeerConnection').mockImplementation(
	mockRTCPeerCOnnection,
)

jest.useFakeTimers()
describe('WRTCConnect', () => {
	test('should be defined', () => {
		expect(WRTCConnect).toBeDefined()
	})

	test('should be able to add remote conection', async () => {
		const wrtc = new WRTCConnect()
		await wrtc.addRemoteConection({
			description: {
				type: 'offer',
				sdp: 'test',
			} as RTCSessionDescription,
			candidates: [new RTCIceCandidate({}), new RTCIceCandidate({})],
		})
		expect(wrtc['candidates'].length).toBe(2)
	})

	test('should be able to get local connection string', async () => {
		const wrtc = new WRTCConnect()
		// call this for set candidatesIsEnd in true
		wrtc['addICECandidates']({} as unknown as RTCPeerConnectionIceEvent)
		const str = wrtc.getLocalConectionStringB64()
		jest.advanceTimersByTime(200)
		expect(str).resolves.toBeDefined()
	})

	describe('whenIceGatheringComplete', () => {
		test('should be resolve if the isEndOfCandidates is true', async () => {
			const wrtc = new WRTCConnect()
			wrtc['addICECandidates']({} as unknown as RTCPeerConnectionIceEvent)
			const promise = wrtc['whenIceGatheringComplete']()

			jest.advanceTimersByTime(200)
			expect(promise).resolves.toBe(true)
		})

		test('should resolve with false if time out (15s) is exeded', async () => {
			const wrtc = new WRTCConnect()
			const promise = wrtc['whenIceGatheringComplete']()
			jest.advanceTimersByTime(2222)

			return expect(promise).resolves.toBe(false)
		})
	})

	describe('onclose', () => {
		test('should be called when close', () => {
			const wrtc = new WRTCConnect()
			const mock = jest.fn()
			wrtc.onclose = mock
			wrtc.close()
			expect(mock).toHaveBeenCalled()
		})
		test('should be called when the conexion is closed', async () => {
			const wrtc = new WRTCConnect()
			jest.spyOn(wrtc, 'iceConnectionState', 'get').mockReturnValue(
				'closed',
			)

			const mock = jest.fn()
			wrtc.onclose = mock
			wrtc.dispatchEvent(new Event('oniceconnectionstatechange'))
			expect(mock).toHaveBeenCalled()
		})
	})
})

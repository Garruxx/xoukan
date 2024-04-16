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
describe('WRTCConnect', () => {
	test('should be defined', () => {
		expect(WRTCConnect).toBeDefined()
	})

	test('onChannel should be called when new channel is created', () => {
		const onChannel = jest.fn()
		const wrtc = new WRTCConnect(onChannel)
		wrtc.createDataChannel('test')
		expect(onChannel).toHaveBeenCalledTimes(1)
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
		const str = await wrtc.getLocalConectionStringB64()
		expect(str).toBeDefined()
	})
})

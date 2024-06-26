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
import { iceServers } from '../config/ice-servers'
export class WRTCConnect extends RTCPeerConnection {
	private candidates: RTCIceCandidate[] = []
	private isEndOfCandidates: boolean = false
	private onCloseCallback: VoidFunction | undefined
	private nativeClose: VoidFunction
	constructor(RTCconfiguration: RTCConfiguration = { iceServers }) {
		super(RTCconfiguration)
		// Handle events
		this.onicecandidate = this.addICECandidates
		this.nativeClose = this.close
		this.close = () => {
			this.nativeClose()
			this.onCloseCallback?.()
		}
	}

	set onclose(callback: VoidFunction) {
		this.onCloseCallback = callback
		this.oniceconnectionstatechange = () => {
			if (this.iceConnectionState !== 'connected') callback()
		}
	}

	async addRemoteConection(conection: {
		description: RTCSessionDescription
		candidates: RTCIceCandidate[]
	}) {
		await this.setRemoteDescription(
			new RTCSessionDescription(conection.description),
		)

		conection.candidates.forEach(async (candidate) => {
			await this.addIceCandidate(new RTCIceCandidate(candidate))
		})
	}

	async getSignal() {
		const offer = await this.createOffer()
		await this.setLocalDescription(offer)
		return this.localDescription
	}

	private async whenIceGatheringComplete() {
		return await new Promise((resolve) => {
			const interval = setInterval(() => {
				if (this.isEndOfCandidates) {
					clearInterval(interval)
					resolve(true)
				}
			}, 200)
			setTimeout(() => {
				clearInterval(interval)
				resolve(false)
			}, 2222)
		})
	}

	async getLocalSignalB64() {
		const offer = await this.getSignal()
		await this.whenIceGatheringComplete()
		const str = JSON.stringify({
			description: offer,
			candidates: this.candidates,
			type: 'offer',
		})
		return btoa(str)
	}

	async setRemoteSignalB64(str: string) {
		const conection = JSON.parse(atob(str))
		await this.addRemoteConection(conection)
	}

	async getAnswer() {
		if (!this.remoteDescription) return
		const answer = await this.createAnswer()
		await this.setLocalDescription(answer)
		return this.localDescription
	}

	async getAnswerB64() {
		const answer = await this.getAnswer()
		return btoa(
			JSON.stringify({
				description: answer,
				candidates: this.candidates,
				type: 'answer',
			}),
		)
	}

	private addICECandidates(e: RTCPeerConnectionIceEvent) {
		if (!e.candidate) return (this.isEndOfCandidates = true)
		this.candidates.push(e.candidate)
	}
}

export type WRTCConnectType = WRTCConnect

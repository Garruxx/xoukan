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
import { iceServers } from './ice-servers'
export class WRTCConnect extends RTCPeerConnection {
	public channels: Map<string, RTCDataChannel> = new Map()
	private candidates: RTCIceCandidate[] = []
	private onChannel?: (channels: Map<string, RTCDataChannel>) => void
	private candidatesIsEnd: boolean = false
	public chatChannel: RTCDataChannel | undefined
	constructor(
		onChannel?: (channels: Map<string, RTCDataChannel>) => void,
		RTCconfiguration: RTCConfiguration = { iceServers },
	) {
		super(RTCconfiguration)
		this.channels = new Map()
		this.onChannel = onChannel
		const chat = this.createDataChannel('chat')
		chat.onopen = () => (this.chatChannel = chat)
		// Handle events
		this.ondatachannel = this.addChannel
		this.onicecandidate = this.addICECandidates
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

	async getOffert() {
		const offer = await this.createOffer()
		await this.setLocalDescription(offer)
		return this.localDescription
	}

	async getLocalConectionStringB64() {
		if (!this.candidatesIsEnd) {
			await new Promise((resolve) => setTimeout(resolve, 500))
		}
		const str = JSON.stringify({
			description: await this.getOffert(),
			candidates: this.candidates,
		})
		return btoa(str)
	}

	async setRemoteConectionStringB64(str: string) {
		const conection = JSON.parse(atob(str))
		await this.addRemoteConection(conection)
		this.candidates = []
	}

	async getAnswer() {
		if (!this.remoteDescription) return
		const answer = await this.createAnswer()
		await this.setLocalDescription(answer)
		return this.localDescription
	}

	private addICECandidates(e: RTCPeerConnectionIceEvent) {
		if (!e.candidate) return (this.candidatesIsEnd = true)
		this.candidates.push(e.candidate)
	}

	private addChannel(e: RTCDataChannelEvent) {
		this.channels.set(e.channel.label, e.channel)
		this.onChannel?.(this.channels)
	}
}
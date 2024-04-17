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

import { ui } from '../lang/ui'
import { WRTCConnect } from '../connection/web-rtc-connect'
import { createWriteStream } from 'streamsaver'

export interface RTCMessageEvent extends MessageEvent {
	channel: RTCDataChannel
}

export class WRTCFileTransfer extends WRTCConnect {
	private onError?: (error: string) => void
	private onNewFIle: (
		file: { name: string; size: number },
		save: () => void,
	) => void

	constructor(
		onNewFile: (
			file: { name: string; size: number },
			save: () => void,
		) => void,
		onError?: (error: string) => void,
		RTCConfiguration?: RTCConfiguration,
	) {
		super(RTCConfiguration)
		this.onError = onError
		this.ondatachannel = this.saveFile
		this.onNewFIle = onNewFile
	}

	async sendFile(file: File) {
		const channel = this.createDataChannel(
			'xoukanFile:' + file.size + ':' + file.name,
		)
		channel.onmessage = (ev) => {
			this.handleSendFileMessages(ev as RTCMessageEvent, file)
		}
	}
	private handleSendFileMessages(ev: RTCMessageEvent, file: File) {
		const channel = ev.channel
		if (ev.data !== 'start') return
		const reader = file.stream().getReader()
		const sendPart = () => {
			reader.read().then((res) => {
				if (res.done) return channel.close()
				channel.send(res.value)
				channel.onbufferedamountlow = sendPart
			})
		}
		sendPart()
	}

	private saveFile(ev: RTCDataChannelEvent) {
		const channel = ev.channel
		// Validate dataChannel
		if (!channel.label?.startsWith('xoukanFile:')) return
		const name = channel.label.replace(/^(\w+:\d+:)/, '')
		const size = parseInt(channel.label.split(':')[1])

		// Validate file size and name
		if (!size || !name || isNaN(size)) {
			return this.onError?.(ui.invalidTransfer)
		}
		this.onNewFIle({ name, size }, async () => {
			const file = createWriteStream(name, { size }).getWriter()

			channel.onmessage = (ev) => file.write(ev.data)
			channel.onclose = () => file.close()
			channel.onerror = () => {
				file.abort()
				this.onError?.(ui.transferAborted)
			}
		})
	}
}

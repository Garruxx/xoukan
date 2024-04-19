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
import { WRTCConnectType } from '../../connection/web-rtc-connect'

export const setSignal = async (
	wrtcConection: WRTCConnectType,
	signalB64: string,
	setAnswer: (offert: string) => void,
	onError?: VoidFunction,
) => {
	try {
		const conectionData = JSON.parse(atob(signalB64))
		if (!conectionData.description || !conectionData.candidates) return
		await wrtcConection.setRemoteSignalB64(signalB64)
		setAnswer(await wrtcConection.getAnswerB64())
	} catch {
		onError && onError()
	}
}

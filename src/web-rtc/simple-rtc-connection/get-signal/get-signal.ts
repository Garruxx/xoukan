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

export const getSignal = async (
	wrtcConnectTion: WRTCConnectType,
	setSignal: (offer: string) => void,
	onConection?: (isOpen: boolean) => void,
) => {
	// For ICE candidates to be created
	const baseChannel = wrtcConnectTion.createDataChannel('base')
	baseChannel.onopen = () => {
		onConection?.(true)
		baseChannel.close()
	}
	wrtcConnectTion.onclose = () => {
		onConection?.(false)
	}

	setSignal(await wrtcConnectTion.getLocalSignalB64())
}

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
import app from '@src/App.module.sass'
import { Header } from './components/header/header'
import { Home } from './views/home/home'
import { useEffect, useRef, useState } from 'react'
import { getSignal, setSignal } from './web-rtc/simple-rtc-connection/'
import { WRTCFileTransfer } from './web-rtc/file-transfer/file-transfer'
import { useSignal } from './context/signal/hook/use-signal'
import { Transferer } from './views/transferer/transferer'
function App() {
	const wrtcConnection = useRef<WRTCFileTransfer>()
	const { signal } = useSignal()
	const [signalToCopy, setSignalToCopy] = useState('')
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		const fileTransfer = new WRTCFileTransfer()
		wrtcConnection.current = fileTransfer
		getSignal(fileTransfer, setSignalToCopy, setIsConnected)
		return () => fileTransfer.close()
	}, [])

	useEffect(() => {
		if (!wrtcConnection.current) return
		setSignal(wrtcConnection.current, signal, setSignalToCopy)
	}, [signal, wrtcConnection])

	return (
		<div className={app.app}>
			<Header isConnected={isConnected} />
			{isConnected ? (
				<Transferer />
			) : (
				<Home signalToCopy={signalToCopy} />
			)}
		</div>
	)
}

export default App

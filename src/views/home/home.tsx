import xoukan_logo from '@src/assets/xoukan.svg'
import { ui } from './lang/ui'
import home from './home.module.sass'
import copy from 'copy-to-clipboard'
import { useCallback, useState } from 'react'
import { HomeProps } from './types/home.props'
import { TextFieldSignal } from './components/text-field-signal/text-field-signal'
export const Home = ({ signalToCopy }: HomeProps) => {
	const [isCopied, setIsCopied] = useState(false)
	const copyToClipboard = useCallback(() => {
		copy(signalToCopy)
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 2000)
	}, [signalToCopy])

	return (
		<div className={home.home}>
			<img src={xoukan_logo} alt="xoukan logo" width={222} height={222} />
			<h2>{ui.welcome_text}</h2>
			<TextFieldSignal />
			<button
				onClick={copyToClipboard}
				disabled={isCopied || !signalToCopy}
			>
				{isCopied ? ui.copied_connection : ui.copy_conection_btn}
			</button>
		</div>
	)
}

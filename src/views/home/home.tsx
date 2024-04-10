import xoukan_logo from '@src/assets/xoukan.svg'
import { ui } from './lang/ui'
import home from './home.module.sass'
import copy from 'copy-to-clipboard'
import { useCallback, useState } from 'react'
import { HomeProps } from './types/home.props'
import { TextFieldIce } from './components/text-field-ice/text-field-ice'
export const Home = ({ ICEToCopy }: HomeProps) => {
	const [isCopied, setIsCopied] = useState(false)
	const copyToClipboard = useCallback(() => {
		copy(ICEToCopy)
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 2000)
	}, [ICEToCopy])

	return (
		<div className={home.home}>
			<img src={xoukan_logo} alt="xoukan logo" width={222} height={222} />
			<h2>{ui.welcome_text}</h2>
			<button onClick={copyToClipboard} disabled={isCopied}>
				{isCopied ? ui.copied_connection : ui.copy_conection_btn}
			</button>
			<TextFieldIce />
		</div>
	)
}

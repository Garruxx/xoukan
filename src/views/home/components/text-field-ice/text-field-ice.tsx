import { useICE } from '@src/context/signal/hook/use-ice'
import { ui } from '../../lang/ui'
import { useCallback } from 'react'
import textFieldIce from './text-field-ice.module.sass'

export const TextFieldIce = () => {
	const { ICE, setICE } = useICE()
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setICE(e.target.value)
		},
		[setICE],
	)
	return (
		<div className={textFieldIce.textFieldIce}>
			<label>
				<span>{ui.input_label}</span>
				<input
					title={ui.input_placeholder}
					type="text"
					placeholder={ui.input_placeholder}
					value={ICE}
					onChange={handleChange}
					required
				/>
			</label>
		</div>
	)
}

import { useICE } from '@src/context/ice/hook/use-ice'
import { ui } from '../../lang/ui'
import { useCallback } from 'react'

export const TextFieldIce = () => {
	const { ICE, setICE } = useICE()
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setICE(e.target.value)
		},
		[setICE],
	)
	return (
		<div>
			<label>
				<span>{ui.input_label}</span>
				<input
					type="text"
					placeholder={ui.input_placeholder}
					value={ICE}
					onChange={handleChange}
				/>
			</label>
		</div>
	)
}

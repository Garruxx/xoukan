import { useSignal } from '@src/context/signal/hook/use-signal'
import { ui } from '../../lang/ui'
import { useCallback } from 'react'
import textFieldIce from './text-field-ice.module.sass'

export const TextFieldIce = () => {
	const { signal, setSignal } = useSignal()
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSignal(e.target.value)
		},
		[setSignal],
	)
	return (
		<div className={textFieldIce.textFieldSignal}>
			<label>
				<span>{ui.input_label}</span>
				<input
					title={ui.input_placeholder}
					type="text"
					placeholder={ui.input_placeholder}
					value={signal}
					onChange={handleChange}
					required
				/>
			</label>
		</div>
	)
}

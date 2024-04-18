import { useSignal } from '@src/context/signal/hook/use-signal'
import { ui } from '../../lang/ui'
import { useCallback } from 'react'
import textFieldIce from './text-field-signal.module.sass'

export const TextFieldSignal = () => {
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
				<div>
					<input
						title={ui.input_placeholder}
						type="text"
						placeholder={ui.input_placeholder}
						value={signal}
						onChange={handleChange}
						disabled={!!signal}
						required
					/>
					{!!signal && (
						<button
							type="button"
							className={textFieldIce.restart}
							onClick={() => location.reload()}
						>
							↺
						</button>
					)}
				</div>
			</label>
		</div>
	)
}

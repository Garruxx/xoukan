import { useSignal } from '@src/context/signal/hook/use-signal'
import { uiText } from '../../lang/ui-text'
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
				<span>{uiText.input_label}</span>
				<div>
					<input
						title={uiText.input_placeholder}
						type="text"
						placeholder={uiText.input_placeholder}
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

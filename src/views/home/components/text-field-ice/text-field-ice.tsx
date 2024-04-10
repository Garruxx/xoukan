import { ui } from '../../lang/ui'

export const TextFieldIce = () => {
	return (
		<div>
			<label>
				<span>{ui.input_label}</span>
				<input type="text" placeholder={ui.input_placeholder} />
			</label>
		</div>
	)
}

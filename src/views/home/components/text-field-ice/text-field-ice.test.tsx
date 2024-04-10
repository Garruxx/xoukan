import { render } from '@testing-library/react'
import { TextFieldIce } from './text-field-ice'
import { ui } from '../../lang/ui'
describe('text-field-ICE', () => {
	it('should render', () => {
		expect(render(<TextFieldIce />)).toBeDefined()
	})

	it('should render the labbel', () => {
		const { getByText } = render(<TextFieldIce />)
		expect(getByText(ui.input_label)).toBeDefined()
	})

	it('should render the input', () => {
		const { getByRole } = render(<TextFieldIce />)
		expect(getByRole('textbox')).toBeDefined()
	})
})

import { render } from '@testing-library/react'
import { TextFieldIce } from './text-field-ice'
describe('text-field-ICE', () => {
	it('should render', () => {
		expect(render(<TextFieldIce />)).toBeDefined()
	})
})

import { act, fireEvent, render } from '@testing-library/react'
import { TextFieldIce } from './text-field-ice'
import { ui } from '../../lang/ui'
import { ICEContextProvider } from '@src/context/ice/ice.context'
import { useICE } from '@src/context/ice/hook/use-ice'
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

	it('should set the value to useICE', async () => {
		// Test components
		const TestComponentWithIce = () => {
			const { ICE } = useICE()
			return <span data-testid="ice-value">{ICE}</span>
		}
		const TestElement = () => {
			return (
				<ICEContextProvider>
					<TestComponentWithIce />
					<TextFieldIce />
				</ICEContextProvider>
			)
		}

		// get elements
		const { getByTestId, getByRole } = render(<TestElement />)
		const input = getByRole('textbox')
		const iceValue = getByTestId('ice-value')

		await act(async () => {
			fireEvent.change(input, { target: { value: 'test value' } })
			await Promise.resolve()
		})
		expect(input.getAttribute('value')).toBe('test value')
		expect(iceValue.textContent).toBe('test value')
	})
})

import { act, fireEvent, render } from '@testing-library/react'
import { TextFieldSignal } from './text-field-signal'
import { uiText } from '../../lang/ui-text'
import { SignalContextProvider } from '@src/context/signal/signal.context'
import { useSignal } from '@src/context/signal/hook/use-signal'
describe('text-field-ICE', () => {
	it('should render', () => {
		expect(
			render(
				<SignalContextProvider>
					<TextFieldSignal />
				</SignalContextProvider>,
			),
		).toBeDefined()
	})

	it('should render the labbel', () => {
		const { getByText } = render(
			<SignalContextProvider>
				<TextFieldSignal />
			</SignalContextProvider>,
		)
		expect(getByText(uiText.input_label)).toBeDefined()
	})

	it('should render the input', () => {
		const { getByRole } = render(
			<SignalContextProvider>
				<TextFieldSignal />
			</SignalContextProvider>,
		)
		expect(getByRole('textbox')).toBeDefined()
	})

	it('should set the value to useSignal', async () => {
		// Test components
		const TestComponentWithSignal = () => {
			const { signal } = useSignal()
			return <span data-testid="signal-value">{signal}</span>
		}
		const TestElement = () => {
			return (
				<SignalContextProvider>
					<TestComponentWithSignal />
					<TextFieldSignal />,
				</SignalContextProvider>
			)
		}

		// get elements
		const { getByTestId, getByRole } = render(<TestElement />)
		const input = getByRole('textbox')
		const iceValue = getByTestId('signal-value')

		await act(async () => {
			fireEvent.change(input, { target: { value: 'test value' } })
			await Promise.resolve()
		})
		expect(input.getAttribute('value')).toBe('test value')
		expect(iceValue.textContent).toBe('test value')
	})
})

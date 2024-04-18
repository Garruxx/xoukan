import { render, screen } from '@testing-library/react'
import { useSignal } from './use-signal'
import { SignalContext, SignalContextProvider } from '../signal.context'

describe('useSignal', () => {
	test('signal should be defined', () => {
		expect(useSignal).toBeDefined()
	})

	test('throw an error if it is not within a signalContextProvider', () => {
		jest.spyOn(console, 'error').mockImplementation(() => {})
		const TestComponent = () => {
			const { signal } = useSignal()
			return <div>{signal}</div>
		}
		expect(() => render(<TestComponent />)).toThrow(
			'useSignal must be used within a SignalContextProvider',
		)
		jest.restoreAllMocks()
	})

	test('if signal is empty and within your Provider, no error will be thrown.', () => {
		const TestComponent = () => {
			const { signal } = useSignal()
			return <div>{signal}</div>
		}
		const TestComponentWithProvider = () => {
			return (
				<SignalContextProvider>
					<TestComponent />
				</SignalContextProvider>
			)
		}

		expect(render(<TestComponentWithProvider />)).toBeDefined()
	})
	test('renderer if useSignal is used inside an SignalContexProvider', () => {
		const TestComponent = () => {
			const { signal } = useSignal()
			return <div>{signal}</div>
		}
		const TestComponentWithProvider = () => {
			return (
				<SignalContext.Provider
					value={{ signal: 'signalText', setSignal: () => {} }}
				>
					<TestComponent />
				</SignalContext.Provider>
			)
		}
		render(<TestComponentWithProvider />)
		expect(screen.getByText('signalText')).toBeDefined()
	})
})

import { render, screen } from '@testing-library/react'
import { useICE } from './use-ice'
import { ICEContext, ICEContextProvider } from '../ice.context'

describe('useICE', () => {
	test('ICE should be defined', () => {
		expect(useICE).toBeDefined()
	})

	test('throw an error if it is not within a ICEContextProvider', () => {
		jest.spyOn(console, 'error').mockImplementation(() => {})
		const TestComponent = () => {
			const { ICE } = useICE()
			return <div>{ICE}</div>
		}
		expect(() => render(<TestComponent />)).toThrow(
			'useICE must be used within a ICEContextProvider',
		)
		jest.restoreAllMocks()
	})

	test('if ICE is empty and within your Provider, no error will be thrown.', () => {
		const TestComponent = () => {
			const { ICE } = useICE()
			return <div>{ICE}</div>
		}
		const TestComponentWithProvider = () => {
			return (
				<ICEContextProvider>
					<TestComponent />
				</ICEContextProvider>
			)
		}

		expect(render(<TestComponentWithProvider />)).toBeDefined()
	})
	test('renderer if useICE is used inside an ICEContexProvider', () => {
		const TestComponent = () => {
			const { ICE } = useICE()
			return <div>{ICE}</div>
		}
		const TestComponentWithProvider = () => {
			return (
				<ICEContext.Provider
					value={{ ICE: 'ICEText', setICE: () => {} }}
				>
					<TestComponent />
				</ICEContext.Provider>
			)
		}
		render(<TestComponentWithProvider />)
		expect(screen.getByText('ICEText')).toBeDefined()
	})
})

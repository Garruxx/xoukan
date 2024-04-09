import { render, screen, cleanup } from '@testing-library/react'
import { useICE } from './use-ice'
import { ICEContext } from '../ice.context'

describe('useICE', () => {
	afterEach(cleanup)
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

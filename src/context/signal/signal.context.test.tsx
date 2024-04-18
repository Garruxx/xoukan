import { JSX, useContext, useEffect } from 'react'
import { ICEContext, ICEContextProvider } from './signal.context'
import { render, screen } from '@testing-library/react'

describe('ipcContext', () => {
	let Consumer: () => JSX.Element

	beforeEach(() => {
		Consumer = () => {
			const { ICE } = useContext(ICEContext)
			return <p>{ICE}</p>
		}
	})
	test('should be defined', () => {
		expect(ICEContext).toBeDefined()
	})

	test('ICEConsumer shows the value', () => {
		const Element = () => {
			return (
				<ICEContext.Provider
					value={{
						ICE: 'baseICE',
						setICE: () => {},
					}}
				>
					<Consumer />
				</ICEContext.Provider>
			)
		}
		render(<Element />)
		expect(screen.getByText('baseICE')).toBeDefined()
	})

	test('ICEProvider can change the ICE value', () => {
		const ChangerElement = () => {
			const { setICE } = useContext(ICEContext)
			useEffect(() => {
				setICE!('newICE')
			})
			return null
		}
		const Element = () => {
			return (
				<ICEContextProvider>
					<Consumer />
					<ChangerElement />
				</ICEContextProvider>
			)
		}

		render(<Element />)
		expect(screen.getByText('newICE')).toBeDefined()
	})
})

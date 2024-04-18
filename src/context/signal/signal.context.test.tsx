import { JSX, useContext, useEffect } from 'react'
import { SignalContext, SignalContextProvider } from './signal.context'
import { render, screen } from '@testing-library/react'

describe('ipcContext', () => {
	let Consumer: () => JSX.Element

	beforeEach(() => {
		Consumer = () => {
			const { signal } = useContext(SignalContext)
			return <p>{signal}</p>
		}
	})
	test('should be defined', () => {
		expect(SignalContext).toBeDefined()
	})

	test('signalConsumer shows the value', () => {
		const Element = () => {
			return (
				<SignalContext.Provider
					value={{
						signal: 'basesignal',
						setSignal: () => {},
					}}
				>
					<Consumer />
				</SignalContext.Provider>
			)
		}
		render(<Element />)
		expect(screen.getByText('basesignal')).toBeDefined()
	})

	test('signalProvider can change the signal value', () => {
		const ChangerElement = () => {
			const { setSignal } = useContext(SignalContext)
			useEffect(() => {
				setSignal!('newsignal')
			})
			return null
		}
		const Element = () => {
			return (
				<SignalContextProvider>
					<Consumer />
					<ChangerElement />
				</SignalContextProvider>
			)
		}

		render(<Element />)
		expect(screen.getByText('newsignal')).toBeDefined()
	})
})

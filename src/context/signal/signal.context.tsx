import { PropsWithChildren, createContext, useState } from 'react'
import { SignalContextType } from './types/signal-context.type'

export const SignalContext = createContext<SignalContextType>({
	setSignal: null,
	signal: null,
})

export const SignalContextProvider = ({ children }: PropsWithChildren) => {
	const [signal, setSignal] = useState('')
	return (
		<SignalContext.Provider value={{ signal, setSignal }}>
			{children}
		</SignalContext.Provider>
	)
}

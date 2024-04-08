import { PropsWithChildren, createContext, useState } from 'react'
import { ICEContextType } from './types/ice-context.type'

export const ICEContext = createContext<ICEContextType>({
	setICE: () => {},
	ICE: '',
})

export const ICEContextProvider = ({ children }: PropsWithChildren) => {
	const [ICE, setICE] = useState('')
	return (
		<ICEContext.Provider value={{ ICE, setICE }}>
			{children}
		</ICEContext.Provider>
	)
}

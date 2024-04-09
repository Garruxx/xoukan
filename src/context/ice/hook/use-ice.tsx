import { useContext } from 'react'
import { ICEContext } from '../ice.context'
import { ICEContextType } from '../types/ice-context.type'

export const useICE = () => {
	const { ICE, setICE } = useContext(ICEContext)
	if (!ICE || !setICE) {
		throw new Error('useICE must be used within a ICEContextProvider')
	}
	return { ICE, setICE } as ICEContextType
}

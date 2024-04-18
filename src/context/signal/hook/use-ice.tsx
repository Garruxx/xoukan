import { useContext } from 'react'
import { ICEContext } from '../ice.context'

export const useICE = () => {
	const { ICE, setICE } = useContext(ICEContext)
	if (ICE == null || setICE == null) {
		throw new Error('useICE must be used within a ICEContextProvider')
	}
	return { ICE, setICE }
}

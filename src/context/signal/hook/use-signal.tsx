import { useContext } from 'react'
import { SignalContext } from '../signal.context'

export const useSignal = () => {
	const { signal, setSignal } = useContext(SignalContext)
	if (signal == null || setSignal == null) {
		throw new Error('useSignal must be used within a SignalContextProvider')
	}
	return { signal, setSignal }
}

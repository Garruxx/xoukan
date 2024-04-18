import { Dispatch, SetStateAction } from 'react'

export interface SignalContextType {
	signal: string | null
	setSignal: Dispatch<SetStateAction<string>> | null
}

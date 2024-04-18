import { Dispatch, SetStateAction } from 'react'

export interface ICEContextType {
	ICE: string | null
	setICE: Dispatch<SetStateAction<string>> | null
}

import { Dispatch, SetStateAction } from 'react'

export interface ICEContextType {
	ICE: string
	setICE: Dispatch<SetStateAction<string>>
}

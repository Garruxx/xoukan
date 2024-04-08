import { HeaderProps } from './types/header.props'

export const Header = ({ conectionStatus }: HeaderProps) => {
	return (
		<div>
			<h2>{conectionStatus}</h2>
		</div>
	)
}

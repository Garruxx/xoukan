import { HeaderProps } from './types/header.props'

export const Header = ({ conectionStatus, infoText }: HeaderProps) => {
	return (
		<div>
			<h2>{conectionStatus}</h2>
			<div>
				<p>{infoText}</p>
			</div>
		</div>
	)
}

import { HeaderProps } from './types/header.props'
import gitLogo from './assets/github-mark-white.svg'

export const Header = ({ conectionStatus, infoText }: HeaderProps) => {
	return (
		<div>
			<div>
				<h2>{conectionStatus}</h2>
				<div>
					<p>{infoText}</p>
				</div>
			</div>
			<img src={gitLogo} alt="git logo white svg png" />
		</div>
	)
}

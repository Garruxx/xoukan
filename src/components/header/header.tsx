import { HeaderProps } from './types/header.props'
import gitLogo from './assets/github-mark-white.svg'
import header from './header.module.sass'

export const Header = ({ conectionStatus, infoText }: HeaderProps) => {
	return (
		<div className={header.header}>
			<div>
				<h2>{conectionStatus}</h2>
				<div>
					<p>
						<span>{infoText}</span>
					</p>
				</div>
			</div>
			<a
				href="https://github.com/Garruxx/xoukan"
				title="visit the repository"
				target="_blank"
			>
				<img
					src={gitLogo}
					alt="git logo white svg png"
					width={40}
					height={40}
				/>
			</a>
		</div>
	)
}

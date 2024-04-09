import xoukan_logo from '@src/assets/xoukan.svg'
import { ui } from './lang/ui'
import home from './home.module.sass'

export const Home = () => {
	return (
		<div className={home.home}>
			<img src={xoukan_logo} alt="xoukan logo" width={222} height={222} />
			<h2>{ui.welcome_text}</h2>
		</div>
	)
}

import xoukan_logo from '@src/assets/xoukan.svg'
import { lang } from './lang/lang'

export const Home = () => {
	return (
		<div>
			<img src={xoukan_logo} alt="xoukan logo" width={222} height={222} />
			<h2>{lang.welcome_text}</h2>
		</div>
	)
}

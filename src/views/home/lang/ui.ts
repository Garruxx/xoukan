import { ui_en } from './en'
import { ui_es } from './es'
import { ui_ja } from './ja'

export const ui = (() => {
	const lang = navigator.language.split('-')[0]
	switch (lang) {
		// english
		case 'en':
			return ui_en
		// spanish
		case 'es':
			return ui_es
		// japanese
		case 'ja':
		case 'jpn':
			return ui_ja
		default:
			return ui_en
	}
})()

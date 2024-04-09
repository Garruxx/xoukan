import { lang_en } from './en'
import { lang_es } from './es'
import { lang_ja } from './ja'

export const lang = () => {
	const lang = navigator.language.split('-')[0]
	switch (lang) {
		// english
		case 'en':
			return lang_en
		// spanish
		case 'es':
			return lang_es
		// japanese
		case 'ja':
			return lang_ja
		default:
			return lang_en
	}
}

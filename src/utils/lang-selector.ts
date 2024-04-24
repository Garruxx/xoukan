export const langSelector = <T>({ es, en, ja }: { es: T; en: T; ja: T }) => {
	const lang = navigator.language.split('-')[0]
	switch (lang) {
		// english
		case 'en':
			return en
		// spanish
		case 'es':
			return es
		// japanese
		case 'ja':
		case 'jpn':
			return ja
		default:
			return en
	}
}

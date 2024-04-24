import { langSelector } from '@src/utils/lang-selector'
import { ui_en } from './en'
import { ui_es } from './es'
import { ui_ja } from './ja'

export const ui = langSelector({
	en: ui_en,
	es: ui_es,
	ja: ui_ja,
})

import { lang_es } from './es'
import { lang_en } from './en'
import { lang_ja } from './ja'
describe('lang', () => {
	let lenguage: jest.SpyInstance<string, []>
	beforeEach(() => {
		lenguage = jest.spyOn(window.navigator, 'language', 'get')
	})
	afterEach(() => {
		lenguage.mockRestore()
		jest.resetModules()
	})
	test('if browser is in spanish spain should return spanish', async () => {
		lenguage.mockReturnValue('es-ES')
		const { lang } = jest.requireActual('./lang')
		expect(lang).toEqual(lang_es)
	})
	test('if browser is in spanish mexico should return spanish', async () => {
		lenguage.mockReturnValue('es-MX')
		const { lang } = jest.requireActual('./lang')
		expect(lang).toEqual(lang_es)
	})
	test('if browser is in english us should return english', async () => {
		lenguage.mockReturnValue('en-US')
		const { lang } = jest.requireActual('./lang')
		expect(lang).toEqual(lang_en)
	})
	test('if browser is in english UK should return english', async () => {
		lenguage.mockReturnValue('en-UK')
		const { lang } = jest.requireActual('./lang')
		expect(lang).toEqual(lang_en)
	})

	test('if browser is in japanese should return japanese', async () => {
		lenguage.mockReturnValue('ja')
		const { lang } = jest.requireActual('./lang')
		expect(lang).toEqual(lang_ja)
	})
	test('if browser is in japanese ISO 639-2/3 should return japanese', async () => {
		lenguage.mockReturnValue('jpn')
		const { lang } = jest.requireActual('./lang')
		expect(lang).toEqual(lang_ja)
	})
})

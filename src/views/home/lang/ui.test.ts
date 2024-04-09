import { ui_es } from './es'
import { ui_en } from './en'
import { ui_ja } from './ja'
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
		const { ui } = jest.requireActual('./ui')
		expect(ui).toEqual(ui_es)
	})
	test('if browser is in spanish mexico should return spanish', async () => {
		lenguage.mockReturnValue('es-MX')
		const { ui } = jest.requireActual('./ui')
		expect(ui).toEqual(ui_es)
	})
	test('if browser is in english us should return english', async () => {
		lenguage.mockReturnValue('en-US')
		const { ui } = jest.requireActual('./ui')
		expect(ui).toEqual(ui_en)
	})
	test('if browser is in english UK should return english', async () => {
		lenguage.mockReturnValue('en-UK')
		const { ui } = jest.requireActual('./ui')
		expect(ui).toEqual(ui_en)
	})

	test('if browser is in japanese should return japanese', async () => {
		lenguage.mockReturnValue('ja')
		const { ui } = jest.requireActual('./ui')
		expect(ui).toEqual(ui_ja)
	})
	test('if browser is in japanese ISO 639-2/3 should return japanese', async () => {
		lenguage.mockReturnValue('jpn')
		const { ui } = jest.requireActual('./ui')
		expect(ui).toEqual(ui_ja)
	})
})

import { langSelector } from './lang-selector'

const MultiUiTextMock = {
	es: {
		title: 'Titulo',
		subtitle: 'Subtitulo',
		button: 'Boton',
	},
	en: {
		title: 'Title',
		subtitle: 'Subtitle',
		button: 'Button',
	},
	ja: {
		title: 'タイトル',
		subtitle: 'サブタイトル',
		button: 'ボタン',
	},
}

describe('langSelector', () => {
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
		const uiText = langSelector(MultiUiTextMock)
		expect(uiText).toEqual(MultiUiTextMock.es)
	})
	test('if browser is in spanish mexico should return spanish', async () => {
		lenguage.mockReturnValue('es-MX')
		const uiText = langSelector(MultiUiTextMock)
		expect(uiText).toEqual(MultiUiTextMock.es)
	})
	test('if browser is in english us should return english', async () => {
		lenguage.mockReturnValue('en-US')
		const uiText = langSelector(MultiUiTextMock)
		expect(uiText).toEqual(MultiUiTextMock.en)
	})
	test('if browser is in english UK should return english', async () => {
		lenguage.mockReturnValue('en-UK')
		const uiText = langSelector(MultiUiTextMock)
		expect(uiText).toEqual(MultiUiTextMock.en)
	})

	test('if browser is in japanese should return japanese', async () => {
		lenguage.mockReturnValue('ja')
		const uiText = langSelector(MultiUiTextMock)
		expect(uiText).toEqual(MultiUiTextMock.ja)
	})
	test('if browser is in japanese ISO 639-2/3 should return japanese', async () => {
		lenguage.mockReturnValue('jpn')
		const uiText = langSelector(MultiUiTextMock)
		expect(uiText).toEqual(MultiUiTextMock.ja)
	})
})

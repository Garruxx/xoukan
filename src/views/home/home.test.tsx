import { render } from '@testing-library/react'
import { Home } from './home'
import { ui } from './lang/ui'
describe('home', () => {
	test('home should be defined', () => {
		expect(Home).toBeDefined()
	})

	test('home should be render', () => {
		const { baseElement } = render(<Home />)
		expect(baseElement).toBeDefined()
	})

	test('xoukan logo to be rendered', () => {
		const { getByRole } = render(<Home />)
		expect(getByRole('img')).toBeDefined()
	})
	test('xoukan welcome text to be rendered', () => {
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const { getByText } = render(<Home />)
		expect(getByText(ui.welcome_text)).toBeDefined()
		jest.resetAllMocks()
	})
})

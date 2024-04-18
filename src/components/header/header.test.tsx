import { render } from '@testing-library/react'
import { Header } from './header'
import { ui } from './lang/ui'

describe('header', () => {
	test('should render', () => {
		const { baseElement } = render(<Header isConnected />)
		expect(baseElement).toBeDefined()
	})

	test('The connection status online must be rendered when is connected', () => {
		const { getByText } = render(<Header isConnected={true} />)
		expect(getByText(ui.online)).toBeDefined()
	})
	test('The onlineInfoText must be rendered when is connected', () => {
		const { getByText } = render(<Header isConnected />)
		expect(getByText(ui.onlineInfoText)).toBeDefined()
	})
	test('The connection status ofline must be rendered when is disconnected', () => {
		const { getByText } = render(<Header isConnected={false} />)
		expect(getByText(ui.offline)).toBeDefined()
	})
	test('The offlineInfoText must be rendered when is disconnected', () => {
		const { getByText } = render(<Header isConnected={false} />)
		expect(getByText(ui.offlineInfoText)).toBeDefined()
	})
	test('The git logo must be rendered', () => {
		const { getByRole } = render(<Header isConnected />)
		expect(getByRole('img')).toBeDefined()
	})
	test('The link to the repository must be rendered', () => {
		const { getByRole } = render(<Header isConnected />)
		const anchor = getByRole('link')
		expect(anchor).toBeDefined()
		expect(anchor.getAttribute('href')).toBe(
			'https://github.com/Garruxx/xoukan',
		)
	})

	test('Should renderer correctly', () => {
		const { baseElement } = render(<Header isConnected />)
		expect(baseElement.innerHTML).toMatchSnapshot()
	})
})

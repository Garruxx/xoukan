import { render } from '@testing-library/react'
import { Header } from './header'

describe('header', () => {
	test('should render', () => {
		const { baseElement } = render(
			<Header conectionStatus="" infoText="" />,
		)
		expect(baseElement).toBeDefined()
	})

	test('The connection status must be rendered', () => {
		const { getByText } = render(
			<Header conectionStatus="online" infoText="" />,
		)
		expect(getByText('online')).toBeDefined()
	})
	test('The infoText must be rendered', () => {
		const { getByText } = render(
			<Header conectionStatus="" infoText="infoText test" />,
		)
		expect(getByText('infoText test')).toBeDefined()
	})
	test('The git logo must be rendered', () => {
		const { getByRole } = render(<Header conectionStatus="" infoText="" />)
		expect(getByRole('img')).toBeDefined()
	})
	test('The link to the repository must be rendered', () => {
		const { getByRole } = render(<Header conectionStatus="" infoText="" />)
		const anchor = getByRole('link')
		expect(anchor).toBeDefined()
		expect(anchor.getAttribute('href')).toBe(
			'https://github.com/Garruxx/xoukan',
		)
	})
})

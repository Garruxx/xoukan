import { render } from '@testing-library/react'
import { Header } from './header'

describe('header', () => {
	test('should render', () => {
		const { baseElement } = render(
			<Header conectionStatus="" infoText="" />,
		)
		expect(baseElement).toBeDefined()
	})
})

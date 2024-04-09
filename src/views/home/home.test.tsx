import { render } from '@testing-library/react'
import { Home } from './home'
describe('home', () => {
	test('home should be defined', () => {
		expect(Home).toBeDefined()
	})

	test('home should be render', () => {
		const { baseElement } = render(<Home />)
		expect(baseElement).toBeDefined()
	})
})

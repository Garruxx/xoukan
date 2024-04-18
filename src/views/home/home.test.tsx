import { fireEvent, render } from '@testing-library/react'
import { Home } from './home'
import { ui } from './lang/ui'
import { act } from 'react-dom/test-utils'
import { ICEContextProvider } from '@src/context/signal/signal.context'

jest.useFakeTimers()
describe('home', () => {
	test('home should be defined', () => {
		expect(Home).toBeDefined()
	})

	test('home should be render', () => {
		const { baseElement } = render(
			<ICEContextProvider>
				<Home ICEToCopy="" />
			</ICEContextProvider>,
		)
		expect(baseElement).toBeDefined()
	})

	test('xoukan logo to be rendered', () => {
		const { getByRole } = render(
			<ICEContextProvider>
				<Home ICEToCopy="" />
			</ICEContextProvider>,
		)
		expect(getByRole('img')).toBeDefined()
	})
	test('xoukan welcome text to be rendered', () => {
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const { getByText } = render(
			<ICEContextProvider>
				<Home ICEToCopy="" />
			</ICEContextProvider>,
		)
		expect(getByText(ui.welcome_text)).toBeDefined()
		jest.resetAllMocks()
	})

	test('button to copy should be rendered', () => {
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const { getByRole } = render(
			<ICEContextProvider>
				<Home ICEToCopy="" />
			</ICEContextProvider>,
		)
		const button = getByRole('button')
		expect(button).toBeDefined()
		expect(button.textContent).toBe(ui.copy_conection_btn)
		jest.resetAllMocks()
	})
	test('button to copy should be change their text when is copied', async () => {
		//mocks
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const beforePrompt = window.prompt
		window.prompt = jest.fn().mockReturnValue('test')

		//renderer
		const { getByRole } = render(
			<ICEContextProvider>
				<Home ICEToCopy="" />
			</ICEContextProvider>,
		)
		const button = getByRole('button')

		// event
		await act(async () => {
			fireEvent.click(button)
			await Promise.resolve()
		})
		//test
		expect(button.textContent).toBe(ui.copied_connection)
		// reset mocks
		jest.resetAllMocks()
		window.prompt = beforePrompt
	})

	test('button should return to its natural state 2s after being clicked.', async () => {
		//mocks
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const beforePrompt = window.prompt
		window.prompt = jest.fn().mockReturnValue('test')

		//renderer
		const { getByRole } = render(
			<ICEContextProvider>
				<Home ICEToCopy="" />
			</ICEContextProvider>,
		)
		const button = getByRole('button')

		// event
		await act(async () => {
			fireEvent.click(button)
			jest.runAllTimers()
			await Promise.resolve()
		})
		//test
		expect(button.textContent).toBe(ui.copy_conection_btn)
		// reset mocks
		jest.resetAllMocks()
		window.prompt = beforePrompt
	})

	test('press the button should copy ICE', async () => {
		//mocks
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const beforePrompt = window.prompt
		window.prompt = jest.fn().mockReturnValue('test')

		//renderer
		const { getByRole } = render(
			<ICEContextProvider>
				<Home ICEToCopy="" />
			</ICEContextProvider>,
		)
		const button = getByRole('button')

		// event
		await act(async () => {
			fireEvent.click(button)
			await Promise.resolve()
		})
		//test
		expect(window.prompt).toHaveBeenCalled()
		// reset mocks
		jest.resetAllMocks()
		window.prompt = beforePrompt
	})
})

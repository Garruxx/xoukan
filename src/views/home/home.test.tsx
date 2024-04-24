import { fireEvent, render } from '@testing-library/react'
import { Home } from './home'
import { uiText } from './lang/ui-text'
import { act } from 'react-dom/test-utils'
import { SignalContextProvider } from '@src/context/signal/signal.context'

jest.useFakeTimers()
describe('home', () => {
	test('home should be defined', () => {
		expect(Home).toBeDefined()
	})

	test('home should be render', () => {
		const { baseElement } = render(
			<SignalContextProvider>
				<Home signalToCopy="" />
			</SignalContextProvider>,
		)
		expect(baseElement).toBeDefined()
	})

	test('xoukan logo to be rendered', () => {
		const { getByRole } = render(
			<SignalContextProvider>
				<Home signalToCopy="" />
			</SignalContextProvider>,
		)
		expect(getByRole('img')).toBeDefined()
	})
	test('xoukan welcome text to be rendered', () => {
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const { getByText } = render(
			<SignalContextProvider>
				<Home signalToCopy="" />
			</SignalContextProvider>,
		)
		expect(getByText(uiText.welcome_text)).toBeDefined()
		jest.resetAllMocks()
	})

	test('button to copy should be rendered', () => {
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const { getByRole } = render(
			<SignalContextProvider>
				<Home signalToCopy="" />
			</SignalContextProvider>,
		)
		const button = getByRole('button')
		expect(button).toBeDefined()
		expect(button.textContent).toBe(uiText.copy_conection_btn)
		jest.resetAllMocks()
	})
	test('button to copy should be change their text when is copied', async () => {
		//mocks
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const beforePrompt = window.prompt
		window.prompt = jest.fn().mockReturnValue('test')

		//renderer
		const { getByRole } = render(
			<SignalContextProvider>
				<Home signalToCopy="" />
			</SignalContextProvider>,
		)
		const button = getByRole('button')

		// event
		await act(async () => {
			fireEvent.click(button)
			await Promise.resolve()
		})
		//test
		expect(button.textContent).toBe(uiText.copied_connection)
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
			<SignalContextProvider>
				<Home signalToCopy="" />
			</SignalContextProvider>,
		)
		const button = getByRole('button')

		// event
		await act(async () => {
			fireEvent.click(button)
			jest.runAllTimers()
			await Promise.resolve()
		})
		//test
		expect(button.textContent).toBe(uiText.copy_conection_btn)
		// reset mocks
		jest.resetAllMocks()
		window.prompt = beforePrompt
	})

	test('press the button should copy signal', async () => {
		//mocks
		jest.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-US')
		const beforePrompt = window.prompt
		window.prompt = jest.fn().mockReturnValue('test')

		//renderer
		const { getByRole } = render(
			<SignalContextProvider>
				<Home signalToCopy="" />
			</SignalContextProvider>,
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

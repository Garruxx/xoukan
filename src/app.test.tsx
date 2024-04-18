/*
 Xoukan Serverless file sharing using webRTC
 Copyright (C) 2024  Jhon Jairo Guerrero Sanchez
 <garruxx@gmail.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import App from './App'
import { render } from '@testing-library/react'
import { SignalContextProvider } from './context/signal/signal.context'

describe('App', () => {
	test('should render', () => {
		const { baseElement } = render(
			<SignalContextProvider>
				<App />
			</SignalContextProvider>,
		)
		expect(baseElement).toBeDefined()
	})
})

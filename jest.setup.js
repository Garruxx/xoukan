const React = require('react')
require('./__mocks__/webrtc')
const { cleanup } = require('@testing-library/react')
global.React = React
afterEach(cleanup)

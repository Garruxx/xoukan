const React = require('react')
const { cleanup } = require('@testing-library/react')
global.React = React
afterEach(cleanup)

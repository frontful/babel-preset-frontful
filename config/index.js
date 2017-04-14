const defaultConfig = require('./index.default')
const objectPath = require('object-path')

const customConfig = objectPath({})

const mergedConfig = {
  server: (
    customConfig.get('server.config') ||
    require('../provider/server')(
      customConfig.get('server.options') ||
      defaultConfig.server.options
    )
  ),
  browser: (
    customConfig.get('browser.config') ||
    require('../provider/browser')(
      customConfig.get('browser.options') ||
      defaultConfig.browser.options
    )
  ),
}

module.exports = mergedConfig

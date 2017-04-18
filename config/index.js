const defaultConfig = require('./index.default')
const providerPackage = require('frontful-config/provider/package')
const objectPath = require('object-path')

const customConfig = objectPath(providerPackage('frontful.babel') || {})

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
  package: (
    customConfig.get('package.config') ||
    require('../provider/package')(
      customConfig.get('package.options') ||
      defaultConfig.package.options
    )
  ),
}

module.exports = mergedConfig

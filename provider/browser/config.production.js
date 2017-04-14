module.exports = function productionConfig(options) {
  return require('./config.development')(options)
}

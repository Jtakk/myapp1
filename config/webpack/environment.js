const { environment } = require('@rails/webpacker')
const webpack = require('webpack')

environment.plugins.prepend('env',
  new webpack.EnvironmentPlugin(['REACT_APP_GMA_KEY'])
)

module.exports = environment

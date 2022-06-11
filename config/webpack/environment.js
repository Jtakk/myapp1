const { environment } = require('@rails/webpacker')

environment.plugins.prepend('env',
  new webpack.EnvironmentPlugin(['REACT_APP_GMA_KEY'])
)

module.exports = environment

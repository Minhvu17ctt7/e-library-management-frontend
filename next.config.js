const path = require('path');

module.exports = {
  webpack: config => {
    config.resolve.alias['component'] = path.join(__dirname, 'component')
    config.resolve.alias['api'] = path.join(__dirname, 'api')
    config.resolve.alias['public'] = path.join(__dirname, 'public')

    return config
  }
}

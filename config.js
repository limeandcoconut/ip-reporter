const isProd = require('./utils').isProd()

module.exports = {
  recorderHost: isProd ? 'http://ip-recorder.jacobsmith.tech' : 'http://localhost:3257',
}

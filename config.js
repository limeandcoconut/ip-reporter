const isProd = require('./utils').isProd()

module.exports = {
  recorderHost: isProd ? 'http://54.200.31.197:3257' : 'http://localhost:3257',
}

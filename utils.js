module.exports = {
  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production',
}


const { env } = require('process');

const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: 'https://localhost:44310',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug'
  }
]

module.exports = PROXY_CONFIG;

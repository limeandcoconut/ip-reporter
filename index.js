const got = require('got')
const fs = require('fs').promises
const { recorderHost } = require('./config.js')
const { secret } = require('./keys.js')

let ipAddress
const logFile = 'ip-log.txt'

const delay = 500
// 1500
// 4500
// 13500
// 40500

const updateIP = async (depth = 1) => {
  let ip
  try {
    ip = await got('http://icanhazip.com').text()
  } catch (error) {
    if (depth > 4) {
      fs.appendFile(logFile, `Failed to GET at ${new Date()}\r\n`)
      return
    }
    setTimeout(() => updateIP(depth + 1), delay * Math.pow(3, depth))
    return
  }

  // Remove trailing newline
  ip = (/\D$/).test(ip) ? ip.slice(0, -1) : ip

  if (ip !== ipAddress) {
    try {
      await got.post(recorderHost, {
        json: {
          ip,
          secret,
        },
      })
    } catch (error) {
      fs.appendFile(logFile, `Failed to POST at ${new Date()}\r\n${error}\r\n`)
      return
    }
  }
}

updateIP()
setInterval(updateIP, 60 * 1000)

/**
 * Logger utility for Chrome extension
 */
const LOG_PREFIX = '[Extension]'

export const logger = {
  info(...args) {
    console.log(LOG_PREFIX, ...args)
  },

  warn(...args) {
    console.warn(LOG_PREFIX, ...args)
  },

  error(...args) {
    console.error(LOG_PREFIX, ...args)
  },

  debug(...args) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(LOG_PREFIX, ...args)
    }
  }
}

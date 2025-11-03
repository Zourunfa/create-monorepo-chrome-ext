/**
 * Logger utility for Chrome extension
 */
const LOG_PREFIX = '[Extension]'

export interface LoggerInterface {
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
  debug(...args: any[]): void
}

export const logger: LoggerInterface = {
  info(...args: any[]): void {
    console.log(LOG_PREFIX, ...args)
  },

  warn(...args: any[]): void {
    console.warn(LOG_PREFIX, ...args)
  },

  error(...args: any[]): void {
    console.error(LOG_PREFIX, ...args)
  },

  debug(...args: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(LOG_PREFIX, ...args)
    }
  }
}
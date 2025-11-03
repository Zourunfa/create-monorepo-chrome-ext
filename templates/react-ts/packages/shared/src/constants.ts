/**
 * Shared constants for Chrome extension
 */

export const MESSAGE_TYPES = {
  GREETING: 'GREETING',
  GET_DATA: 'GET_DATA',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS'
} as const

export const STORAGE_KEYS = {
  COUNT: 'count',
  SETTINGS: 'settings',
  USER_DATA: 'userData'
} as const

export const APP_NAME = 'My Chrome Extension' as const
export const APP_VERSION = '1.0.0' as const

export type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES]
export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS]

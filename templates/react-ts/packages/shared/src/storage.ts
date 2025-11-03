/**
 * Storage utility for Chrome extension
 */

export interface StorageInterface {
  get<T = any>(key: string): Promise<T | null>
  set<T = any>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
}

export const storage: StorageInterface = {
  /**
   * Get value from storage
   */
  async get<T = any>(key: string): Promise<T | null> {
    try {
      const result = await chrome.storage.local.get(key)
      return result[key] || null
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  },

  /**
   * Set value in storage
   */
  async set<T = any>(key: string, value: T): Promise<void> {
    try {
      await chrome.storage.local.set({ [key]: value })
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  /**
   * Remove value from storage
   */
  async remove(key: string): Promise<void> {
    try {
      await chrome.storage.local.remove(key)
    } catch (error) {
      console.error('Storage remove error:', error)
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      await chrome.storage.local.clear()
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  }
}

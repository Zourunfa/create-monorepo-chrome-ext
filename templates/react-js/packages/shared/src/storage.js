/**
 * Storage utility for Chrome extension
 */
export const storage = {
  /**
   * Get value from storage
   * @param {string} key 
   * @returns {Promise<any>}
   */
  async get(key) {
    try {
      const result = await chrome.storage.local.get(key)
      return result[key]
    } catch (error) {
      console.error('Storage get error:', error)
      return null
    }
  },

  /**
   * Set value in storage
   * @param {string} key 
   * @param {any} value 
   * @returns {Promise<void>}
   */
  async set(key, value) {
    try {
      await chrome.storage.local.set({ [key]: value })
    } catch (error) {
      console.error('Storage set error:', error)
    }
  },

  /**
   * Remove value from storage
   * @param {string} key 
   * @returns {Promise<void>}
   */
  async remove(key) {
    try {
      await chrome.storage.local.remove(key)
    } catch (error) {
      console.error('Storage remove error:', error)
    }
  },

  /**
   * Clear all storage
   * @returns {Promise<void>}
   */
  async clear() {
    try {
      await chrome.storage.local.clear()
    } catch (error) {
      console.error('Storage clear error:', error)
    }
  }
}

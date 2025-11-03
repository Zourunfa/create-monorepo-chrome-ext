import { logger, storage } from '@extension/shared'

logger.info('Background service worker started!')

// Listen for extension installation
chrome.runtime.onInstalled.addListener(async (details: chrome.runtime.InstalledDetails) => {
  logger.info('Extension installed:', details.reason)

  if (details.reason === 'install') {
    // Initialize storage on first install
    await storage.set('count', 0)
    logger.info('Storage initialized')
  }
})

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((
  request: { type: string; [key: string]: any },
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  logger.info('Background received message:', request)

  if (request.type === 'GET_DATA') {
    // Example: Fetch data and respond
    sendResponse({ data: 'Hello from background!' })
  }

  return true // Indicates asynchronous response
})

// Example: Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status === 'complete') {
    logger.info('Tab loaded:', tab.url)
  }
})

// Example: Handle browser action clicks (if needed)
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
  logger.info('Extension icon clicked on tab:', tab.id)
})

logger.info('Background service worker initialized!')
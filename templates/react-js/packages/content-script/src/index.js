import { logger } from '@extension/shared'

logger.info('Content script loaded!')

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  logger.info('Content script received message:', request)
  
  if (request.type === 'GREETING') {
    // Show a notification on the page
    showNotification(request.message)
    sendResponse({ success: true })
  }
  
  return true
})

// Example: Inject a notification into the page
function showNotification(message) {
  const notification = document.createElement('div')
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: #4CAF50;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: system-ui, sans-serif;
    animation: slideIn 0.3s ease-out;
  `
  
  // Add animation
  const style = document.createElement('style')
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `
  document.head.appendChild(style)
  
  document.body.appendChild(notification)
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse'
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

// Example: Monitor page changes
const observer = new MutationObserver((mutations) => {
  // Handle DOM changes if needed
})

observer.observe(document.body, {
  childList: true,
  subtree: true
})

logger.info('Content script initialized!')

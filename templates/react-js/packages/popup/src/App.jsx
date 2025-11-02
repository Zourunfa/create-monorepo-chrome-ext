import { useState, useEffect } from 'react'
import { storage } from '@extension/shared'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [tabInfo, setTabInfo] = useState('Loading...')

  useEffect(() => {
    // Load count from storage
    storage.get('count').then(savedCount => {
      if (savedCount !== null) {
        setCount(savedCount)
      }
    })

    // Get current tab info
    chrome.tabs.query({ active: true, currentWindow: true }).then(([tab]) => {
      setTabInfo(tab.title || 'Unknown')
    })
  }, [])

  const increment = async () => {
    const newCount = count + 1
    setCount(newCount)
    await storage.set('count', newCount)
  }

  const decrement = async () => {
    const newCount = count - 1
    setCount(newCount)
    await storage.set('count', newCount)
  }

  const sendMessage = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(tab.id, {
      type: 'GREETING',
      message: 'Hello from popup!'
    })
  }

  return (
    <div className="popup-container">
      <h1>🚀 Chrome Extension</h1>
      <p>Built with React + Monorepo</p>

      <div className="counter">
        <button onClick={decrement}>-</button>
        <span className="count">{count}</span>
        <button onClick={increment}>+</button>
      </div>

      <div className="info">
        <p>Current Tab: {tabInfo}</p>
      </div>

      <button onClick={sendMessage} className="action-btn">
        Send Message to Content Script
      </button>
    </div>
  )
}

export default App

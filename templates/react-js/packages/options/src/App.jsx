import { useState, useEffect } from 'react'
import { storage } from '@extension/shared'
import './App.css'

const DEFAULT_SETTINGS = {
  enabled: true,
  notifications: true,
  theme: 'auto',
  interval: 60,
  apiKey: ''
}

function App() {
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS })
  const [saveStatus, setSaveStatus] = useState('')

  useEffect(() => {
    // Load settings from storage
    storage.get('settings').then(saved => {
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...saved })
      }
    })
  }, [])

  const saveSettings = async (newSettings) => {
    await storage.set('settings', newSettings)
    setSaveStatus('✓ Saved')
    setTimeout(() => setSaveStatus(''), 2000)
  }

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const resetSettings = () => {
    setSettings({ ...DEFAULT_SETTINGS })
    saveSettings({ ...DEFAULT_SETTINGS })
  }

  return (
    <div className="options-container">
      <header>
        <h1>⚙️ Extension Options</h1>
        <p>Configure your extension settings</p>
      </header>

      <main>
        <section className="settings-section">
          <h2>General Settings</h2>

          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => handleChange('enabled', e.target.checked)}
              />
              Enable Extension
            </label>
          </div>

          <div className="setting-item">
            <label>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              Show Notifications
            </label>
          </div>

          <div className="setting-item">
            <label htmlFor="theme">Theme:</label>
            <select
              id="theme"
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h2>Advanced Settings</h2>

          <div className="setting-item">
            <label htmlFor="interval">Update Interval (seconds):</label>
            <input
              type="number"
              id="interval"
              value={settings.interval}
              onChange={(e) => handleChange('interval', parseInt(e.target.value))}
              min="1"
              max="3600"
            />
          </div>

          <div className="setting-item">
            <label htmlFor="apiKey">API Key:</label>
            <input
              type="password"
              id="apiKey"
              value={settings.apiKey}
              onChange={(e) => handleChange('apiKey', e.target.value)}
              placeholder="Enter your API key"
            />
          </div>
        </section>

        <div className="actions">
          <button onClick={resetSettings} className="reset-btn">
            Reset to Defaults
          </button>
          {saveStatus && <div className="save-status">{saveStatus}</div>}
        </div>
      </main>
    </div>
  )
}

export default App

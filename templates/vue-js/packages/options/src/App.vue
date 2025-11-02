<template>
  <div class="options-container">
    <header>
      <h1>⚙️ Extension Options</h1>
      <p>Configure your extension settings</p>
    </header>
    
    <main>
      <section class="settings-section">
        <h2>General Settings</h2>
        
        <div class="setting-item">
          <label>
            <input type="checkbox" v-model="settings.enabled" @change="saveSettings">
            Enable Extension
          </label>
        </div>
        
        <div class="setting-item">
          <label>
            <input type="checkbox" v-model="settings.notifications" @change="saveSettings">
            Show Notifications
          </label>
        </div>
        
        <div class="setting-item">
          <label for="theme">Theme:</label>
          <select id="theme" v-model="settings.theme" @change="saveSettings">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </section>
      
      <section class="settings-section">
        <h2>Advanced Settings</h2>
        
        <div class="setting-item">
          <label for="interval">Update Interval (seconds):</label>
          <input 
            type="number" 
            id="interval" 
            v-model.number="settings.interval" 
            @change="saveSettings"
            min="1"
            max="3600"
          >
        </div>
        
        <div class="setting-item">
          <label for="apiKey">API Key:</label>
          <input 
            type="password" 
            id="apiKey" 
            v-model="settings.apiKey" 
            @change="saveSettings"
            placeholder="Enter your API key"
          >
        </div>
      </section>
      
      <div class="actions">
        <button @click="resetSettings" class="reset-btn">Reset to Defaults</button>
        <div class="save-status" v-if="saveStatus">{{ saveStatus }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { storage } from '@extension/shared'

const DEFAULT_SETTINGS = {
  enabled: true,
  notifications: true,
  theme: 'auto',
  interval: 60,
  apiKey: ''
}

export default {
  name: 'App',
  setup() {
    const settings = ref({ ...DEFAULT_SETTINGS })
    const saveStatus = ref('')
    
    onMounted(async () => {
      // Load settings from storage
      const saved = await storage.get('settings')
      if (saved) {
        settings.value = { ...DEFAULT_SETTINGS, ...saved }
      }
    })
    
    const saveSettings = async () => {
      await storage.set('settings', settings.value)
      saveStatus.value = '✓ Saved'
      setTimeout(() => {
        saveStatus.value = ''
      }, 2000)
    }
    
    const resetSettings = async () => {
      settings.value = { ...DEFAULT_SETTINGS }
      await saveSettings()
    }
    
    return {
      settings,
      saveStatus,
      saveSettings,
      resetSettings
    }
  }
}
</script>

<style scoped>
.options-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

header {
  margin-bottom: 40px;
}

h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
  color: #333;
}

header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.settings-section {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.settings-section h2 {
  margin: 0 0 20px 0;
  font-size: 20px;
  color: #333;
}

.setting-item {
  margin-bottom: 20px;
}

.setting-item:last-child {
  margin-bottom: 0;
}

.setting-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.setting-item input[type="checkbox"] {
  margin-right: 8px;
}

.setting-item input[type="number"],
.setting-item input[type="password"],
.setting-item select {
  width: 100%;
  max-width: 300px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.reset-btn {
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: #da190b;
}

.save-status {
  color: #4CAF50;
  font-weight: 500;
}
</style>

<template>
  <div class="popup-container">
    <h1>🚀 Chrome Extension</h1>
    <p>Built with Vue + Monorepo</p>
    
    <div class="counter">
      <button @click="decrement">-</button>
      <span class="count">{{ count }}</span>
      <button @click="increment">+</button>
    </div>
    
    <div class="info">
      <p>Current Tab: {{ tabInfo }}</p>
    </div>
    
    <button @click="sendMessage" class="action-btn">
      Send Message to Content Script
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { storage } from '@extension/shared'

export default {
  name: 'App',
  setup() {
    const count = ref(0)
    const tabInfo = ref('Loading...')
    
    onMounted(async () => {
      // Load count from storage
      const savedCount = await storage.get('count')
      if (savedCount !== null) {
        count.value = savedCount
      }
      
      // Get current tab info
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      tabInfo.value = tab.title || 'Unknown'
    })
    
    const increment = async () => {
      count.value++
      await storage.set('count', count.value)
    }
    
    const decrement = async () => {
      count.value--
      await storage.set('count', count.value)
    }
    
    const sendMessage = async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      chrome.tabs.sendMessage(tab.id, { 
        type: 'GREETING',
        message: 'Hello from popup!' 
      })
    }
    
    return {
      count,
      tabInfo,
      increment,
      decrement,
      sendMessage
    }
  }
}
</script>

<style scoped>
.popup-container {
  width: 300px;
  padding: 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

h1 {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #333;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.counter button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.counter button:hover {
  background: #45a049;
}

.count {
  font-size: 32px;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.info {
  margin: 20px 0;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
}

.action-btn {
  width: 100%;
  padding: 12px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #0b7dda;
}
</style>

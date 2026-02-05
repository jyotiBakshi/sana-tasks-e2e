import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://sana.ai/ynFUyevTTc3U',
    chromeWebSecurity: false,
  },
})

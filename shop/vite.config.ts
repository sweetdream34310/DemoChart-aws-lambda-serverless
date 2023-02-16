import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', '.ts'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/styles/main.scss";`
      }
    }
  },
})

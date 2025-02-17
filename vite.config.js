import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    server: {
      proxy: {
      // Target is your backend API
        '/api': {
            target: 'https://spotify-be-b07j.onrender.com/public/swagger-ui/index.html#/App%20Access/login', 
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            
            configure: (proxy) => {
               proxy.on('error', (err) => {
                console.log('error', err);
               });
               proxy.on('proxyReq', (proxyReq, req) => {
                console.log('Request sent to target:', req.method, req.url);
               });
               proxy.on('proxyRes', (proxyRes, req) => {
                console.log('Response received from target:', proxyRes.statusCode, req.url);
               });
         },
      },
    },
  },
 })

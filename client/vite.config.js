import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_SERVER_URL': JSON.stringify(env.REACT_APP_SERVER_URL),
      'process.env.REACT_APP_google_oauth_client_id': JSON.stringify(env.REACT_APP_google_oauth_client_id),
      'process.env.REACT_APP_apiKey': JSON.stringify(env.REACT_APP_apiKey),
      'process.env.REACT_APP_authDomain': JSON.stringify(env.REACT_APP_authDomain),
      'process.env.REACT_APP_projectId': JSON.stringify(env.REACT_APP_projectId),
      'process.env.REACT_APP_storageBucket': JSON.stringify(env.REACT_APP_storageBucket),
      'process.env.REACT_APP_messagingSenderId': JSON.stringify(env.REACT_APP_messagingSenderId),
      'process.env.REACT_APP_appId': JSON.stringify(env.REACT_APP_appId),
    },
    plugins: [react()],
    server: {
      port: 3000, // Change this to the desired port
    },
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs';
// https://vitejs.dev/config/


const server = {};

if ('TRUE' === process.env.VITE_USE_SECURE_API) {
  Object.assign(server,{
    https:{
      key: fs.readFileSync('./.cert/key.pem'),
      cert: fs.readFileSync('./.cert/cert.pem'),
    },
  });
}
export default defineConfig({
  server,
  plugins: [react()],
});

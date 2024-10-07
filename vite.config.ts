import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import * as fs from 'fs';
// https://vitejs.dev/config/

const server = {};

export default (mode: string) => {
  const loadedEnv = { ...process.env, ...loadEnv(mode, process.cwd()) };

  if ('TRUE' === loadedEnv.VITE_USE_SECURE_API) {
    Object.assign(server, {
      https: {
        key: fs.readFileSync('./.cert/key.pem'),
        cert: fs.readFileSync('./.cert/cert.pem'),
      },
    });
  }

  return defineConfig({
    server,
    plugins: [react()],
  });
};

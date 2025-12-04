import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ mode }: { mode: string }) => {

  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [vue()],
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
  });
};

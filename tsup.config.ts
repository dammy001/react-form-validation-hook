import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['react'],
  target: 'node14',
  outDir: 'dist',
  clean: true,
  dts: true,
  treeshake: true,
  async onSuccess() {
    console.log('Done...');
  },
});

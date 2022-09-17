import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import { main, module } from './package.json';

export default defineConfig({
    plugins: [vue(), jsx(), dts()],
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['cjs', 'es'],
            fileName: format => (format === 'cjs' ? main : module).replace(/^dist\//, ''),
        },
        rollupOptions: {
            external: ['vue', 'markdown-it', /^highlight.js/, 'vc-state'],
        },
        minify: false,
    },
});

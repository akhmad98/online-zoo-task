import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    root: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'pages/landing/index.html'),
                animal: resolve(__dirname, 'pages/animal/animal.html'),
                map: resolve(__dirname, 'pages/map/map.html'),
                contacts: resolve(__dirname, 'pages/contacts/contact.html')
            }
        }
    }
})
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                sitemap: resolve(__dirname, 'sitemap.html'),
                admin: resolve(__dirname, 'admin.html'),
                'week1/simulator': resolve(__dirname, 'week1/simulator.html'),
                'week2/simulator': resolve(__dirname, 'week2/simulator.html'),
                'week3/simulator': resolve(__dirname, 'week3/simulator.html'),
                'week4/simulator': resolve(__dirname, 'week4/simulator.html'),
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})

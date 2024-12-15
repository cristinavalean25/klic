import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // For React with SWC support

export default defineConfig({
    plugins: [react()], // Add React support
    resolve: {
        alias: {
            '@fonts': '/src/assets/fonts', // Alias for font directory
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://klic.immoflux.ro', // Proxy for API
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        chunkSizeWarningLimit: 2000, // Increase chunk size warning limit (optional)
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-bootstrap': ['react-bootstrap'], // Split react-bootstrap into its own chunk
                },
            },
        },
    },
});

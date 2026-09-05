import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'photo-upload-handler',
        configureServer(server) {
          server.middlewares.use('/api/upload-doctor-photo', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => body += chunk);
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  const base64Data = (data.base64 || '').replace(/^data:image\/\w+;base64,/, '');
                  if (!base64Data) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'No image data provided' }));
                    return;
                  }
                  const buffer = Buffer.from(base64Data, 'base64');
                  
                  const publicPath = path.resolve(__dirname, 'public/dr-mahmoud.jpg');
                  fs.writeFileSync(publicPath, buffer);

                  const assetPath = path.resolve(__dirname, 'src/assets/images/dr_mahmoud_photo_1788368502061.jpg');
                  if (fs.existsSync(path.dirname(assetPath))) {
                    fs.writeFileSync(assetPath, buffer);
                  }
                  
                  const distDir = path.resolve(__dirname, 'dist');
                  if (fs.existsSync(distDir)) {
                    fs.writeFileSync(path.resolve(distDir, 'dr-mahmoud.jpg'), buffer);
                  }
                  
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, path: '/dr-mahmoud.jpg' }));
                } catch (e: any) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
            } else {
              res.writeHead(405).end();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

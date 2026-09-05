import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON middleware with generous limit for high-res base64 image uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const dataDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const settingsFilePath = path.resolve(dataDir, 'server-settings.json');

  // Helper to read server settings
  function getServerSettings(): Record<string, any> {
    try {
      if (fs.existsSync(settingsFilePath)) {
        const raw = fs.readFileSync(settingsFilePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('[Server Settings Read Error]:', e);
    }
    return {};
  }

  // Helper to write server settings
  function saveServerSettings(settings: Record<string, any>) {
    try {
      fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), 'utf-8');
    } catch (e) {
      console.error('[Server Settings Write Error]:', e);
    }
  }

  // Ensure public directory exists
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Health check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // 2. Get server-persisted site settings & uploaded doctor photo
  app.get('/api/site-settings', (req, res) => {
    res.set({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    const settings = getServerSettings();
    const publicPhotoPath = path.resolve(publicDir, 'dr-mahmoud.jpg');
    const hasPhotoOnDisk = fs.existsSync(publicPhotoPath);

    res.json({
      success: true,
      hasPhotoOnDisk,
      settings: settings || {}
    });
  });

  // 3. Upload doctor photo and persist permanently to disk & server settings
  app.post('/api/upload-doctor-photo', (req, res) => {
    try {
      const { base64 } = req.body;
      if (!base64) {
        return res.status(400).json({ error: 'No image data provided' });
      }

      const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // A. Write to public/dr-mahmoud.jpg
      const publicPath = path.resolve(publicDir, 'dr-mahmoud.jpg');
      fs.writeFileSync(publicPath, buffer);

      // B. Write to dist/dr-mahmoud.jpg if dist exists
      const distDir = path.resolve(process.cwd(), 'dist');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.resolve(distDir, 'dr-mahmoud.jpg'), buffer);
      }

      // C. Also update src/assets/images fallback if exists
      const assetPath = path.resolve(process.cwd(), 'src/assets/images/dr_mahmoud_photo_1788368502061.jpg');
      if (fs.existsSync(path.dirname(assetPath))) {
        fs.writeFileSync(assetPath, buffer);
      }

      // D. Update data/server-settings.json with timestamp and base64
      const current = getServerSettings();
      const timestamp = Date.now();
      current.doctorPhotoUrl = `/dr-mahmoud.jpg?v=${timestamp}`;
      current.doctorPhotoBase64 = base64;
      current.doctorPhotoUpdatedAt = new Date().toISOString();
      saveServerSettings(current);

      console.log(`[Doctor Photo] Successfully persisted to server disk: ${buffer.length} bytes`);

      res.json({
        success: true,
        doctorPhotoUrl: current.doctorPhotoUrl,
        base64: base64,
        size: buffer.length
      });
    } catch (err: any) {
      console.error('[Doctor Photo Upload Error]:', err);
      res.status(500).json({ error: err?.message || 'Failed to save doctor photo on server' });
    }
  });

  // 4. Save general site settings to server disk
  app.post('/api/save-site-settings', (req, res) => {
    try {
      const { settings } = req.body;
      if (!settings) {
        return res.status(400).json({ error: 'No settings provided' });
      }
      const current = getServerSettings();
      const updated = { ...current, ...settings, updatedAt: new Date().toISOString() };
      saveServerSettings(updated);
      res.json({ success: true, settings: updated });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Failed to save settings' });
    }
  });

  // Serve static files from public with appropriate caching
  app.use(express.static(publicDir));

  // Vite middleware for development vs static production serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

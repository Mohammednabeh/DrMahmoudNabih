var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.use(import_express.default.urlencoded({ extended: true, limit: "50mb" }));
  const dataDir = import_path.default.resolve(process.cwd(), "data");
  if (!import_fs.default.existsSync(dataDir)) {
    import_fs.default.mkdirSync(dataDir, { recursive: true });
  }
  const settingsFilePath = import_path.default.resolve(dataDir, "server-settings.json");
  function getServerSettings() {
    try {
      if (import_fs.default.existsSync(settingsFilePath)) {
        const raw = import_fs.default.readFileSync(settingsFilePath, "utf-8");
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("[Server Settings Read Error]:", e);
    }
    return {};
  }
  function saveServerSettings(settings) {
    try {
      import_fs.default.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), "utf-8");
    } catch (e) {
      console.error("[Server Settings Write Error]:", e);
    }
  }
  const publicDir = import_path.default.resolve(process.cwd(), "public");
  if (!import_fs.default.existsSync(publicDir)) {
    import_fs.default.mkdirSync(publicDir, { recursive: true });
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.get("/api/site-settings", (req, res) => {
    res.set({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    });
    const settings = getServerSettings();
    const publicPhotoPath = import_path.default.resolve(publicDir, "dr-mahmoud.jpg");
    const hasPhotoOnDisk = import_fs.default.existsSync(publicPhotoPath);
    res.json({
      success: true,
      hasPhotoOnDisk,
      settings: settings || {}
    });
  });
  app.post("/api/upload-doctor-photo", (req, res) => {
    try {
      const { base64 } = req.body;
      if (!base64) {
        return res.status(400).json({ error: "No image data provided" });
      }
      const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const publicPath = import_path.default.resolve(publicDir, "dr-mahmoud.jpg");
      import_fs.default.writeFileSync(publicPath, buffer);
      const distDir = import_path.default.resolve(process.cwd(), "dist");
      if (import_fs.default.existsSync(distDir)) {
        import_fs.default.writeFileSync(import_path.default.resolve(distDir, "dr-mahmoud.jpg"), buffer);
      }
      const assetPath = import_path.default.resolve(process.cwd(), "src/assets/images/dr_mahmoud_photo_1788368502061.jpg");
      if (import_fs.default.existsSync(import_path.default.dirname(assetPath))) {
        import_fs.default.writeFileSync(assetPath, buffer);
      }
      const current = getServerSettings();
      const timestamp = Date.now();
      current.doctorPhotoUrl = `/dr-mahmoud.jpg?v=${timestamp}`;
      current.doctorPhotoBase64 = base64;
      current.doctorPhotoUpdatedAt = (/* @__PURE__ */ new Date()).toISOString();
      saveServerSettings(current);
      console.log(`[Doctor Photo] Successfully persisted to server disk: ${buffer.length} bytes`);
      res.json({
        success: true,
        doctorPhotoUrl: current.doctorPhotoUrl,
        base64,
        size: buffer.length
      });
    } catch (err) {
      console.error("[Doctor Photo Upload Error]:", err);
      res.status(500).json({ error: err?.message || "Failed to save doctor photo on server" });
    }
  });
  app.post("/api/save-site-settings", (req, res) => {
    try {
      const { settings } = req.body;
      if (!settings) {
        return res.status(400).json({ error: "No settings provided" });
      }
      const current = getServerSettings();
      const updated = { ...current, ...settings, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
      saveServerSettings(updated);
      res.json({ success: true, settings: updated });
    } catch (err) {
      res.status(500).json({ error: err?.message || "Failed to save settings" });
    }
  });
  app.use(import_express.default.static(publicDir));
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map

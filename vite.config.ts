import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 8090 },
  // Railway отдаёт прод-сборку через `vite preview`; allowedHosts: true
  // снимает блокировку внешнего домена *.up.railway.app
  preview: { host: true, allowedHosts: true },
});

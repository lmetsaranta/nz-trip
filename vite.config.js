import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nz-trip/",
  plugins: [
    react(),
    {
      name: "redirect-trailing-slash",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/nz-trip") {
            res.writeHead(301, { Location: "/nz-trip/" });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
});

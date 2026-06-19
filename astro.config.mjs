import { defineConfig } from "astro/config";
import meno from "meno-astro/integration";

export default defineConfig({
  site: "https://www.maciejpostek.com",
  output: "static",
  trailingSlash: "never",
  integrations: [meno()],
  vite: {
    server: {
      host: "127.0.0.1"
    }
  }
});

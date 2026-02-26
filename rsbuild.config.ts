import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
  },
  html: {
    title: "The Temporary Plane",
    favicon: "./public/favicon.ico",
  },
  server: {
    historyApiFallback: true,
  },
});

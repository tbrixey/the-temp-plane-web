import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["NEXT_PUBLIC_"] });

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/entry.tsx",
    },
    define: publicVars,
  },
  html: {
    title: "The Temporary Plane",
    favicon: "./public/favicon.ico",
  },
  server: {
    historyApiFallback: true,
  },
});

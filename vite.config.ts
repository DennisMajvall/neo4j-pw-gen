/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    open: true,
    port: 3000,
    strictPort: true,
  },

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "configs/vitest.setup.ts",
    pool: "threads",
    testTimeout: 100,
    hookTimeout: 100,
    teardownTimeout: 100,
    poolOptions: {
      threads: {
        useAtomics: true,
      },
    },
    mockReset: true,
    passWithNoTests: true,
    typecheck: {
      enabled: true,
    },
    expect: {
      requireAssertions: true,
    },
  },
});

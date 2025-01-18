import type { Config } from "tailwindcss";
import {
  tailwindConfig as needleTailwindConfig,
  tailwindTheme,
} from "@neo4j-ndl/base";

export default {
  presets: [needleTailwindConfig],
  corePlugins: {
    preflight: false,
  },

  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { tailwindTheme },
  },
  plugins: [],
} satisfies Config;

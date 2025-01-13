/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@neo4j-ndl/base").tailwindConfig],
  corePlugins: {
    preflight: false,
  },

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  presets: [require("@neo4j-ndl/base").tailwindConfig],
  prefix: "",
  corePlugins: {
    preflight: false,
  },

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

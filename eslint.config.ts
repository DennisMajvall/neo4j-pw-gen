import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["*.ts", "**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_.*",
          argsIgnorePattern: "^_.*",
        },
      ],
      "no-unused-vars": "off",
      eqeqeq: "error",
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  prettierConfig
);

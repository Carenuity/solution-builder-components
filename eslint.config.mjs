import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['dist/', 'node_modules/', 'src/stories/'],
  },
  { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        1,
        { args: 'after-used', argsIgnorePattern: '^_' },
      ],
    },
  },
];

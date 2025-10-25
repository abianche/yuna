import path from 'node:path';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    path.join(__dirname, '../ui/src/**/*.{ts,tsx,js,jsx}'),
    path.join(__dirname, 'node_modules/@yuna/ui/dist/**/*.{js,jsx,ts,tsx,mjs,cjs}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;

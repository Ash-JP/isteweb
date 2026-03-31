import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      colors: {
        navy: {
          50: '#e8eef9',
          100: '#c3d4f0',
          200: '#9ab8e6',
          300: '#719bdc',
          400: '#5385d4',
          500: '#0A1E5E',
          600: '#091a54',
          700: '#071548',
          800: '#05103c',
          900: '#030824',
        },
        sky: {
          50: '#e8f6fd',
          100: '#c5e8fa',
          200: '#9fd9f7',
          300: '#79caf3',
          400: '#5cbff1',
          500: '#4BA3D9',
          600: '#3b8fc9',
          700: '#2f76b0',
          800: '#255e96',
          900: '#1a4570',
        },
        gold: {
          50: '#fffaeb',
          100: '#fff3c6',
          200: '#ffe78d',
          300: '#ffd754',
          400: '#ffc927',
          500: '#FFD700',
          600: '#e6c200',
          700: '#bfa100',
          800: '#997f00',
          900: '#735f00',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
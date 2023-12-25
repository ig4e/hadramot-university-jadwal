/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
};

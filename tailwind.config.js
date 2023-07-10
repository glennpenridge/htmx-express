/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/**/*.{html,js}", "./server/templates/*.ejs"],
  theme: {
    fontFamily: {
      sans: '"JetBrains Mono", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    },
    extend: {},
  },
  plugins: [],
};

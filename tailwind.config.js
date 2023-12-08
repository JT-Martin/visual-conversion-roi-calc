/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,svelte}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Red Hat Display Variable", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};

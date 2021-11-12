module.exports = {
  // mode: 'jit',
  purge: [
    ".src/pages/**/*.{js,ts,jsx,tsx}",
    ".src/components/**/*.{js,ts,jsx,tsx}",
    ".src/features/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // false or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
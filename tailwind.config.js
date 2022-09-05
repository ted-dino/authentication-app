/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightPrimary: "#333333",
        darkPrimary: "#E0E0E0",
        secondary: "#828282",
        accent: "#2f80ed",
        borderClr: "#BDBDBD",
      },
    },
  },
  plugins: [],
};

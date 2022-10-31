const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nonito: ["Nunito", "sans-serif"],
      },
      height: {
        "vh-10": "10vh",
        "vh-20": "20vh",
        "vh-30": "30vh",
        "vh-40": "40vh",
        "vh-50": "50vh",
        "vh-60": "60vh",
        "vh-70": "70vh",
        "vh-80": "80vh",
      },
    },
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};

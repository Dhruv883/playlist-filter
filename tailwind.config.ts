import { color } from "framer-motion";

const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notoSans: ["Noto Sans", "sans-serif"],
        manRope: ["Manrope", "sans-serif"],
      },
      colors: {
        primary: "#1D2123", // dark blue
        secondary: "#FACD66", //yellow
        lightBlue: "#A4C7C6", //light blue
        blackGray: "#25292B", //gray
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

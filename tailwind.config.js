/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwindcss-animated")],
  theme: {
    extend: {
      colors: {
        chat: {
          gray: {
            800: "#444654",
            900: "#202123",
            nav: "#343541",
            user: "#343541",
            ai: "#444654",
          },
        },
      },
    },
  },
  plugins: [],
};

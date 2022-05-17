module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-mode-bg": "hsl(207, 26%, 17%)",
        "dark-mode-element": "hsl(209, 23%, 22%)",
        "light-bg": " hsl(0, 0%, 98%)",
        "light-mode-text": "hsl(200, 15%, 8%)",
        "light-mode-input": "hsl(0, 0%, 52%)",
        "light-mode-element": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        "nunito-sans": "Nunito Sans, sans-serif",
      },
      // boxShadow: {
      //   "3xl": "rgba(0, 0, 0, 0.35) -2px -0.5px 15px -2px;",
      // },
    },
  },
  plugins: [],
};

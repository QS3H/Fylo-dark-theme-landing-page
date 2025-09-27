module.exports = {
  content: ["./*.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        Navy850: "hsl(217, 28%, 15%)",
        Navy900: "hsl(218, 28%, 13%)",
        Navy950: "hsl(216, 53%, 9%)",
        Navy800: "hsl(219, 30%, 18%)",
        accentTeal: "hsl(176, 68%, 64%)",
        accentCyan: "hsl(198, 60%, 50%)",
        Red500: "hsl(0, 100%, 63%)",
        neutralWhite: "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "logo-dark-mode": "url('../images/logo-dark-mode.svg')",
        "logo-light-mode": "url('../images/logo-light-mode.svg')",
        "curvy-dark-mode": "url('../images/bg-curvy-dark-mode.svg')",
        "curvy-light-mode": "url('../images/bg-curvy-light-mode.svg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};

module.exports = {
  purge: [
    "../../../themes/2022/layouts/*.html",
    "../../../themes/2022/layouts/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#90cf43",
      },
      fontFamily: {
        body: ["arial"],
        heading: ["'Merriweather', serif"],
      },
      textColor: {
        primary: "#90cf43",
      },
      backgroundColor: {
        primary: "#8cc43d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

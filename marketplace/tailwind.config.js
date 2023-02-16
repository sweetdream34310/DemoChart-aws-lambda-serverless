module.exports = {
  content: [
    "./assets/**/*.{vue,js,css}",
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "demo-red": "#d34943",
        "demo-violet": "#5858e6",
        "demo-active": "#25df14",
        "demo-inactive": "#a7a8a7",
        "demo-gray": "#858585",
        "demo-gray-100": "#f4f4f5",
        "demo-gray-200": "#cecece",
        "demo-gray-800": "#3b3b3b",
      },
      transitionProperty: {
        'button': 'transform, brightness',
        'spacing': 'margin, padding',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

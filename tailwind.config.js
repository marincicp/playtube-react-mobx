/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#171717",
        "custom-green": "#40c057",
        "custom-bg": "#f1f3f5",
        "custom-gray-dark": "#666",
        "gray-light": "#ced4da",
        "gradient-1": "#cc2b5e",
        "gradient-2": "#753a88",
      },
      screens: {
        xsm: "320px",
        sm: "520px",
        md: "780px",
        lg: "950px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};

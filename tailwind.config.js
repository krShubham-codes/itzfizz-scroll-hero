/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { ink: "#0b0b0d", asphalt: "#141416", fizz: "#c6ff3d" },
      fontFamily: { display: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F6E8EA",
      },
      fontFamily: {
        Default: ["Urbanist", "sans-serif"],
        'anime': ['Anime', 'sans-serif'],
      },
      screens: {
        'xs': '380px',
      }
    },
  },
  plugins: [],
};

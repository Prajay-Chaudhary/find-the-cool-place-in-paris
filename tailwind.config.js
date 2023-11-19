/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",


    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nexa': ['Nexa', 'sans-serif'],
      },
      textColor: {
        'main-color': '#5f259f',
      },
    },
  },
  plugins: [],
}


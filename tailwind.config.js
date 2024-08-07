/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor: '#D6E8EE',
        secundaryColor: '#A39D97',
        terciaryColor: '#57707A'
      },
    },
  },
  plugins: [],
}

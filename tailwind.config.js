/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{html,js, jsx}"],
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    extend: {
      colors: {
        'hover': '#6366f1',
        'checked': '#6366f1'
      }
    },
  },
  plugins: [],
}


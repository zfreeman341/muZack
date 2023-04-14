module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#9B8EPD',
          200: '#84665E',
          300: '#0D2615',
          400: '#1C1E1C',
          500: '#0A0A0A',
          600: '#27BD5C',
          700: '#3B98C0',
          800: '#3CDBC0'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

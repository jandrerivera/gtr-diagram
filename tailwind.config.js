module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // sans: ['Montserrat', 'sans-serif'],
      sans: ['Kantumruy Pro', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

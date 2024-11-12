/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '1px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(23.55deg, #080D0D 75.24%, #173B4D 97.12%)',
        'body-gradient':
          'linear-gradient(191.53deg, #79F2EC 0%, #14518E 100%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

const colors = require('./src/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu-Regular'],
        ubuntuMedium: ['Ubuntu-Medium'],
        ubuntuBold: ['Ubuntu-Bold'],
        ubuntuLight: ['Ubuntu-Light'],
        inter: ['inter'],
      },
      colors,
      borderColor:{
        ...colors
      },
      spacing: {
        '16px': '16px',
        '72px': '72px',
      },
      borderRadius: {
        'pill': '100px',
      },
      fontSize:{
        '3xl': '2rem',
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
};

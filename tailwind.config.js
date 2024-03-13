/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,md,liquid,erb,serb,rb}',
    './frontend/javascript/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'comic-code': ['Comic Code Ligatures']
      },
    },
  },
  daisyui: {
    themes: [
      {
        albarn: {
          "primary": "#22697D",
          "secondary": "#C4F4C7",
          "accent": "#c1cefe",
          "neutral": "#0A0F0D",
          "base-100": "#e1a885",
          "info": "#6CCFF6",
          "success": "#98C9A3",
          "warning": "#D00000",
          "error": "#e40066",
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}


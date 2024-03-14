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
          "primary": "#7c98fd",
          "secondary": "#C4F4C7",
          "accent": "#caf3f7",
          "neutral": "#0A0F0D",
          "base-100": "#f7ddca",
          "info": "#94A6E5",
          "success": "#009485",
          "warning": "#ff9900",
          "error": "#ff5724",
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}


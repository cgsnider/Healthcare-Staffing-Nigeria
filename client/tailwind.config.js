module.exports = {
  content: ["./src/**/*.{html,js,jsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'logo': "url('../public/resources/cmg_logo.png')"
      },
      colors: {
        'cmg-light':'#00ff00',
        'cmg-dark': '#142c14'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

module.exports = {
  content: ["./src/**/*.{html,js,jsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'logo': "url('../public/resources/cmg_logo.png')",
        'home': "url('/src/images/home-bg.jpg')",
      },
      colors: {
        'cmg-light':'#00ff00',
        'cmg-mid': '#3a8c3c',
        'cmg-dim': 'ffffff',
        'cmg-dark': '#142c14',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

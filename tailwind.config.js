/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899',
        accent: '#10B981',
        dark: '#1F2937',
        light: '#F8FAFC'
      }
    }
  },
  plugins: []
}

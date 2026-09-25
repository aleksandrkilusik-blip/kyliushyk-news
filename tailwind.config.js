/** Конфіг повторює той, що був інлайном у index.html (Play CDN). */
module.exports = {
  content: ['./*.html', './letters/*.html', './en/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        gold: { DEFAULT: '#FBBF24', light: '#FCD34D', pale: '#FEF3C7' },
        slate: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0',
          700: '#334155', 800: '#1E293B', 900: '#0F172A', 950: '#020617',
        },
      },
    },
  },
  plugins: [],
}

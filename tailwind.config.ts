import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './shared/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1d1d1d',
          soft: '#2b2b2b',
          mute: '#515152',
        },
        accent: {
          DEFAULT: '#08fdd8',
          mint: '#91eae4',
        },
        fog: '#909096',
      },
      fontFamily: {
        display: ['"Mochiy Pop One"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        tag: ['"La Belle Aurore"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(8, 253, 216, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config

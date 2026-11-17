/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          light: '#FCF7F0',
          DEFAULT: '#F7EBDD',
          dark: '#EED9C4',
        },
        ivory: {
          light: '#FFFFFF',
          DEFAULT: '#FFF8EF',
          dark: '#F5ECE0',
        },
        burgundy: {
          light: '#962A45',
          DEFAULT: '#781F35',
          dark: '#581324',
          deep: '#420B19',
        },
        rose: {
          antique: '#B76E79',
          soft: '#D49BA3',
          pale: '#F2D7DA',
        },
        copper: {
          light: '#CD8D65',
          DEFAULT: '#B87950',
          dark: '#9B5F37',
        },
        espresso: {
          light: '#53372E',
          DEFAULT: '#38251F',
          dark: '#211511',
        },
        gold: {
          light: '#F4E5BE',
          DEFAULT: '#D6B77A',
          metallic: '#C8A359',
          dark: '#9F7C38',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        decorative: ['"Cinzel Decorative"', 'serif'],
        marcellus: ['"Marcellus"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        sans: ['"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(214, 183, 122, 0.45)',
        'burgundy-glow': '0 0 30px rgba(120, 31, 53, 0.3)',
        'card-royal': '0 20px 50px -12px rgba(56, 37, 31, 0.25), 0 0 0 1px rgba(214, 183, 122, 0.3)',
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #D6B77A 0%, #FFF3D6 50%, #B87950 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #781F35 0%, #581324 100%)',
        'ivory-radial': 'radial-gradient(circle at center, #FFF8EF 0%, #F7EBDD 100%)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-gentle': 'floatGentle 5s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(4deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '1', filter: 'brightness(1.15)' },
        },
      },
    },
  },
  plugins: [],
}

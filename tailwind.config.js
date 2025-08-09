/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#effcfc',
          100: '#d7f6f6',
          200: '#b4eeef',
          300: '#7ee2e5',
          400: '#41cfd4',
          500: '#26b4bb',
          600: '#1e929d',
          700: '#1e7680',
          800: '#215f68',
          900: '#204f58',
          950: '#10333d',
        },
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['monospace'],
        display: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        body: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#1E3A8A", 
        secondary: "#9333EA",
      },
      spacing: {
        18: "4.5rem", 
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'float-slow-reverse': 'float-slow-reverse 25s ease-in-out infinite',
        'float-particle': 'float-particle 15s linear infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'rotate-slow': 'rotate 12s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'float-slow': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-30px, 20px) scale(1.05)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'float-slow-reverse': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        'float-particle': {
          '0%': { transform: 'translateY(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh)', opacity: 0 },
        },
        'wave': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("@tailwindcss/forms")
  ],
};

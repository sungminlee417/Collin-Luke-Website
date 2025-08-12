/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        'muse-red': '#EE2E31',
        'muse-gray': '#888888',
        'muse-dark': '#0a0a0a',
        'muse-light': '#fafafa',
        'primary': {
          50: '#fef7f0',
          100: '#feeee0',
          200: '#fcd9c1',
          300: '#f9bf97',
          400: '#f59e6b',
          500: '#f17d47',
          600: '#e35f2b',
          700: '#bd4621',
          800: '#973621',
          900: '#7a2e1e',
          950: '#42160e',
        },
        'accent': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#EE2E31',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#4c0519',
        },
        'neutral': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        'surface': {
          'glass': 'rgba(255, 255, 255, 0.08)',
          'glass-dark': 'rgba(0, 0, 0, 0.08)',
        }
      },
      fontFamily: {
        'candu': ['Candu-Condensed', 'Impact', 'Arial Narrow', 'Arial', 'system-ui', 'sans-serif'],
        'source': ["Source Sans Pro", 'system-ui', 'sans-serif'],
        'bebas': ["Bebas Neue", 'Impact', 'Arial Black', 'system-ui', 'sans-serif'],
        'display': ['Candu-Condensed', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
        224: "56rem",
        240: "60rem",
      },
      rotate: {
        "neg-135": "-135deg",
        135: "135deg",
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'reveal': 'reveal 1s ease-out forwards',
        'blur-in': 'blurIn 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        reveal: {
          '0%': { 
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            opacity: '0'
          },
          '100%': { 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            opacity: '1'
          },
        },
        blurIn: {
          '0%': { filter: 'blur(20px)', opacity: '0' },
          '100%': { filter: 'blur(0px)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            maxWidth: 'none',
            a: {
              color: '#EE2E31',
              '&:hover': {
                color: '#dc2626',
              },
            },
            'h1, h2, h3, h4': {
              color: '#111827',
            },
            code: {
              color: '#EE2E31',
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontWeight: 'normal',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
        dark: {
          css: {
            color: '#d1d5db',
            'h1, h2, h3, h4': {
              color: '#f9fafb',
            },
            a: {
              color: '#fca5a5',
              '&:hover': {
                color: '#f87171',
              },
            },
            code: {
              color: '#fca5a5',
              backgroundColor: '#374151',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

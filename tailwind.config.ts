import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        destructive: 'hsl(var(--destructive))',
        cute: {
          pink: 'hsl(var(--cute-pink))',
          blue: 'hsl(var(--cute-blue))',
          yellow: 'hsl(var(--cute-yellow))',
          purple: 'hsl(var(--cute-purple))',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 4px 0 0 hsl(var(--border)), 0 8px 20px -4px hsl(var(--foreground) / 0.1)',
        'cute-lg': '0 6px 0 0 hsl(var(--primary) / 0.3), 0 12px 30px -4px hsl(var(--primary) / 0.2)',
        'cute-inset': 'inset 0 2px 4px 0 hsl(var(--foreground) / 0.05)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'jelly': 'jelly 0.5s',
        'float': 'floatGentle 4s ease-in-out infinite',
        'plant-sway': 'plantSway 3s ease-in-out infinite',
        'chicken-walk': 'chickenWalk 2s ease-in-out infinite',
        'cooking-bubble': 'cookingBubble 1.5s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        jelly: {
          '0%': { transform: 'scale(1, 1)' },
          '25%': { transform: 'scale(0.9, 1.1)' },
          '50%': { transform: 'scale(1.1, 0.9)' },
          '75%': { transform: 'scale(0.95, 1.05)' },
          '100%': { transform: 'scale(1, 1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, hsl(var(--primary-light)), hsl(var(--primary)))',
        'gradient-cute': 'linear-gradient(135deg, hsl(var(--cute-pink)), hsl(var(--cute-purple)))',
        'gradient-warm': 'linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--warning)))',
      },
    },
  },
  plugins: [],
}

export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kinetix: {
          primary: "#4F46E5",       // Royal Indigo
          primaryHover: "#4338CA",  // Darker Indigo
          primaryLight: "#EEF2FF",  // Soft Lavender / Indigo Tint
          lavender: "#F8F9FE",      // Reference 1 clean background
          lavenderSoft: "#F3F4FD",  // Slightly deeper lavender
          accent: "#6366F1",
          black: "#0F172A",         // Slate 900
          charcoal: "#1E293B",
          muted: "#64748B",         // Slate 500
          border: "#E2E8F0",
          cardBorder: "#EEF0F8",
          success: "#10B981",       // Savings Green
          successLight: "#ECFDF5",
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(79, 70, 229, 0.04)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 20px 30px -10px rgba(79, 70, 229, 0.12)',
        'button': '0 4px 14px 0 rgba(79, 70, 229, 0.35)',
        'dropdown': '0 10px 38px -10px rgba(22, 23, 24, 0.25), 0 10px 20px -15px rgba(22, 23, 24, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

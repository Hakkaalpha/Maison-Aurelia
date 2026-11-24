/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurelia: {
          obsidian: "#0B0C0E",     // Matte Obsidian Black
          charcoal: "#14161A",     // Charcoal Vault
          slate: "#21242C",        // Deep Slate
          gold: "#C6A45E",         // Champagne Gold
          goldLight: "#F8F5EE",    // Delicate Gold Glow
          goldBorder: "#E2D3B8",   // Refined Gold Accent Border
          goldDark: "#947636",
          alabaster: "#FAFAFA",    // Alabaster White Background
          pure: "#FFFFFF",
          border: "#EAE6DF",       // Warm Luxury Architectural Border
          borderSubtle: "#F2EFEB",
          muted: "#737580",
          cream: "#FAF8F5",
          // Per-product signature accent panels
          azure: "#3E82C4",
          olive: "#5C6942",
          amber: "#C26D38",
          burgundy: "#782C3A",
          titanium: "#465669",
          emerald: "#2E6B56",
        },
        prive: {
          obsidian: "#0B0C10",
          charcoal: "#17181F",
          slate: "#252733",
          gold: "#B89653",
          goldLight: "#F8F5EE",
          goldBorder: "#E2D3B8",
          goldDark: "#8C6E33",
          alabaster: "#FAFAFA",
          pure: "#FFFFFF",
          border: "#EAE6DF",
          borderSubtle: "#F2EFEB",
          muted: "#737580",
          cream: "#FAF8F5",
        }
      },
      fontFamily: {
        condensed: ['"Barlow Condensed"', '"Oswald"', 'sans-serif'],
        display: ['"Barlow Condensed"', '"Oswald"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        ui: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(11, 12, 16, 0.05), 0 2px 6px -1px rgba(184, 150, 83, 0.04)',
        'luxury-hover': '0 20px 40px -12px rgba(11, 12, 16, 0.12), 0 4px 12px -2px rgba(184, 150, 83, 0.08)',
        'gold-glow': '0 0 25px -4px rgba(184, 150, 83, 0.35)',
        'obsidian-glow': '0 10px 30px -5px rgba(11, 12, 16, 0.4)',
      },
      letterSpacing: {
        'widest-plus': '0.22em',
        'super': '0.3em',
      }
    },
  },
  plugins: [],
}

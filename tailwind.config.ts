import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#F4F5F3",
          surface: "#FFFFFF",
          ink: "#12140F",
          muted: "#6B7169",
          line: "#E4E7E1",
          green: {
            DEFAULT: "#1E9E5A",
            dark: "#146B3E",
            light: "#3FC57F",
            mist: "#E7F6EC",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(18, 20, 15, 0.06)",
        card: "0 2px 12px rgba(18, 20, 15, 0.05)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floatY: "floatY 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;

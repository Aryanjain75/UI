/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      // ─── DESIGN TOKENS ───────────────────────────────────────
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        danger: {
          50:  "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          950: "#450a0a",
        },
        success: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          950: "#052e16",
        },
        warning: {
          50:  "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          950: "#451a03",
        },
      },

      // ─── KEYFRAMES ───────────────────────────────────────────
      keyframes: {
        "indeterminate": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-25%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-25%)" },
          "100%": { transform: "translateX(0)" },
        },
        "typing": {
          "from": { width: "0" },
          "to":   { width: "100%" },
        },
        "blink": {
          "0%, 100%": { "border-color": "transparent" },
          "50%":      { "border-color": "currentColor" },
        },
        "slide-in-from-right-4": {
          "0%":   { transform: "translateX(1rem)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "zoom-in-95": {
          "0%":   { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "blur-in": {
          "0%":   { filter: "blur(4px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
      },
      animation: {
        "indeterminate":          "indeterminate 1.5s ease-in-out infinite",
        "marquee":                "marquee var(--marquee-speed, 40s) linear infinite",
        "marquee-reverse":        "marquee-reverse var(--marquee-speed, 40s) linear infinite",
        "typing":                 "typing 2s steps(40) forwards, blink .75s step-end infinite",
        "blur-in":                "blur-in 0.4s ease forwards",
        "slide-in-from-right-4":  "slide-in-from-right-4 0.2s ease-out",
        "fade-in":                "fade-in 0.15s ease-out",
        "zoom-in-95":             "zoom-in-95 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

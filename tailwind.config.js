module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg-color)",
        surface: "var(--primary-surface-color)",
        surface2: "var(--secondary-surface-color)",
        accent: "var(--accent-color)",
        text: "var(--text-color)",
        muted: "var(--text-muted-color)",
        border: "var(--border-color)",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4da6ff",
          DEFAULT: "#0078d4",
          dark: "#005a9e",
        },
        secondary: {
          light: "#f8f9fa",
          DEFAULT: "#e9ecef",
          dark: "#dee2e6",
        },
      },
    },
  },
  plugins: [],
};

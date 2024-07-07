/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#f2f2f2",
        primary: "rgb(255,108,55)",
      },
    },
  },
  plugins: [],
};

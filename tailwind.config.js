/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#f2f2f2",
        button:'#17bd9c',
        primary:'#2f0951',
        myred:'#fb2735'
      },
    },
  },
  plugins: [],
};

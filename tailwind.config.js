/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveSideways: {
          "0%, 100%": {
            transform: "translateX(-100px)",
          },
          "50%": {
            transform: "translateX(100px)",
          },
        },
      },
      animation: {
        moveSideways: "moveSideways 4s infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      source: ["Source Sans Pro"],
    },
    extend: {
      spacing: {
        160: "40rem",
        176: "44rem",
        192: "48rem",
        208: "52rem",
      },
      rotate: {
        "neg-135": "-135deg",
        135: "135deg",
      },
    },
  },
  plugins: [],
};

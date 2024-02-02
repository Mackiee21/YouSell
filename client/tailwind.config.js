/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "md": "15px"
      },
      scale: {
        "102": "1.02"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/theme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
  		center: true,
  		padding: {
  			DEFAULT: '0.8rem',
  			sm: '1.5rem',
  			lg: '2rem',
  			xl: '3rem',
  			'2xl': '6rem'
  		}
  	},
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [heroui(), require("tailwindcss-animate")],
};

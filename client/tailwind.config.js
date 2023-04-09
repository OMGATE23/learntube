/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1000px',
      xl: '1440px',
    },
    extend: {
      fontFamily : {
        'poppins' : ['Poppins']
      } ,
      colors : {
        backgroundClr: "#120e26",
        primary: 'rgb(var(--primary) , <alpha-value>)',
        divider: 'rgb(var(--divider) , <alpha-value>)',
        content: 'rgb(var(--content) , <alpha-value>)',
        'base-100': 'rgb(var(--base-100) , <alpha-value>)',
        'base-200': 'rgb(var(--base-200) , <alpha-value>)',
        'base-gray': 'rgb(var(--base-gray) , <alpha-value>)',
        'primary-hover': 'rgb(var(--primary-hover) , <alpha-value>)',
        'primary-disable': 'rgb(var(--primary-disable) , <alpha-value>)',
      }
    },
  },
  plugins: [],
}


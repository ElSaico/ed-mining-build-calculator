/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      black: "black",
      white: "white",
      grey: {
        1: "#262626", /* hsl(0,0%,15%); */
        2: "#4d4d4d", /* hsl(0,0%,30%); */
        3: "#808080", /* hsl(0,0%,50%); */
        4: "#b3b3b3", /* hsl(0,0%,70%); */
        5: "#d9d9d9", /* hsl(0,0%,85%); */
      },
      orange: {
        1: "#321d0b", /* hsl(27, 65%,12%); */
        2: "#552a07", /* hsl(27, 85%,18%); */
        3: "#b85300", /* hsl(27,100%,36%); */
        4: "#f56e00", /* hsl(27,100%,48%); */
        5: "#ff8f33", /* hsl(27,100%,60%); */
      },
      red: {
        1: "#430a0a", /* hsl(0, 75%,15%); */
        2: "#740606", /* hsl(0, 90%,24%); */
        3: "#b80000", /* hsl(0,100%,36%); */
        4: "#f50000", /* hsl(0,100%,48%); */
        5: "#ff3333", /* hsl(0,100%,60%); */
      },
      blue: {
        1: "#0b3d50", /* hsl(197, 75%,18%); */
        2: "#065574", /* hsl(197, 90%,24%); */
        3: "#0084b8", /* hsl(197,100%,36%); */
        4: "#00aff5", /* hsl(197,100%,48%); */
        5: "#33c5ff", /* hsl(197,100%,60%); */
      },
      green: {
        1: "#005c2b", /* hsl(148,100%,18%); */
        2: "#007a39", /* hsl(148,100%,24%); */
        3: "#009947", /* hsl(148,100%,30%); */
        4: "#0bda6c", /* hsl(148, 90%,45%); */
        5: "#47eb94", /* hsl(148, 80%,60%); */
      },
      yellow: {
        1: "#3d2b00", /* hsl(42,100%,12%); */
        2: "#5c4000", /* hsl(42,100%,18%); */
        3: "#b88100", /* hsl(42,100%,36%); */
        4: "#f5ab00", /* hsl(42,100%,48%); */
        5: "#ffc233", /* hsl(42,100%,60%); */
      },
    },
    fontFamily: {
      caps: ["EuroCaps", "Verdana", "Geneva", "sans-serif"],
      text: ["Sintony", "Helvetica", "Arial", "sans-serif"],
      fixed: ["Telegrama", '"Courier New"', "Courier", "monospace"],
    }
  },
  plugins: [],
}

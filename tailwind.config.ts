import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'custom-hsl-gradient': 'linear-gradient(200deg, hsl(258deg 22% 9%) 0%, hsl(252deg 38% 14%) 29%, hsl(251deg 48% 20%) 40%, hsl(250deg 54% 25%) 48%, hsl(251deg 59% 30%) 55%, hsl(252deg 64% 36%) 61%, hsl(254deg 69% 41%) 67%, hsl(257deg 75% 45%) 74%, hsl(260deg 83% 49%) 81%, hsl(265deg 100% 50%) 100%)',

      },
    },
  },
  plugins: [],
};
export default config;

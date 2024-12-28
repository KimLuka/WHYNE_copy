import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "var(--color-primary)",
      "primary-gradient": "var(--primary-gradient)",
      secondary: "var(--color-secondary)",
      white: "var(--white)",
      black: "var(--black)",
      red: "var(--red)",
      gray: {
        100: "#f2f4f8",
        300: "#cfdbea",
        500: "#9FACBD",
        800: "#2d3034",
      },
    },
    screens: {
      desktop: "1024px",
      // => @media (min-width: 1920px) { ... }

      tablet: "744px",
      // => @media (min-width: 744px) { ... }

      mobile: "375px",
      // => @media (min-width: 375px) { ... }

      // 'pt-default': {'raw': '(min-height: 600px) and (max-height: 799px)'},
      // 'pt-800': {'raw': '(min-height: 800px) and (max-height: 819px)'},
      // 'pt-820': {'raw': '(min-height: 820px)'},
      //   'h-600': {'raw': '(min-height: 600px) and (max-height: 666px)'},
      //   'h-667': {'raw': '(min-height: 667px) and (max-height: 739px)'},
      //   'h-740': {'raw': '(min-height: 740px) and (max-height: 799px)'},
      //   'h-800': {'raw': '(min-height: 800px) and (max-height: 819px)'},
      //   'h-820': {'raw': '(min-height: 820px) and (max-height: 843px)'},
      //   'h-844': {'raw': '(min-height: 844px) and (max-height: 895px)'},
      //   'h-896': {'raw': '(min-height: 896px) and (max-height: 1023px)'},
      //   'h-1024': {'raw': '(min-height: 1024px)'}
    },
    //새로 추가
    extend: {
      fontSize: {
        "3xl": [
          "3.2rem",
          {
            lineHeight: "4.2rem",
          },
        ],
        "2xl": [
          "2.4rem",
          {
            lineHeight: "3.2rem",
          },
        ],
        xl: [
          "2rem",
          {
            lineHeight: "3.2rem",
          },
        ],
        "2lg": [
          "1.8rem",
          {
            lineHeight: "2.6rem",
          },
        ],
        lg: [
          "1.6rem",
          {
            lineHeight: "2.6rem",
          },
        ],
        md: [
          "1.4rem",
          {
            lineHeight: "2.4rem",
          },
        ],
        sm: ["1.3rem", { lineHeight: "2.2rem" }],
        xs: ["1.2rem", { lineHeight: "2rem" }],
        "xs-tight": [
          "1.2rem",
          {
            lineHeight: "1.8rem",
          },
        ],
      },
      fontWeight: {
        regular: "var(--regular)",
        medium: "var(--medium)",
        semiBold: "var(--semi-bold)",
        bold: "var(--bold)",
      },
      boxShadow: {
        "filter-modal": "0.2rem 0.2rem 2rem 0 rgba(0, 0, 0, 0.04)",
        sm: "0 0.2rem 2rem 0 rgba(0, 0, 0, 0.04)",
        mdl: "0.4rem 0.4rem 1.4rem rgba(188, 188, 188, 0.2)",
        mdr: "-0.4rem 0.4rem 1.4rem rgba(188, 188, 188, 0.2)",
        md: [
          "0.4rem 0.4rem 1.4rem rgba(188, 188, 188, 0.2)",
          "-0.4rem 0.4rem 1.4rem rgba(188, 188, 188, 0.2)",
        ],
        mds: "0.4rem 0.4rem 1rem rgba(136, 136, 136, 0.2)",
        "2md": "0.4rem 0.4rem 2rem rgba(224,230,238, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;

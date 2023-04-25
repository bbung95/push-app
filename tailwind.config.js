/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "1025px",
            xl: "1280px",
            xl2: "1360px",
        },
        extend: {
            colors: {
                "main-color": "#1689D8",
                "sub-color": "rgba(#9BD4FC, 0.2)",
            },
            width: {
                "wrap1/2": "calc(50% - 6.5px)",
            },
        },
    },
    plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
};

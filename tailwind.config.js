/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "main-home": "url('/img/main.png')",
                "wooman-beauty": "url('/img/art_4.png')",
                "modern-art": "url('/img/art.png')",
            },
            height: {
                108: "26rem",
            },
        },
    },
    plugins: [],
};

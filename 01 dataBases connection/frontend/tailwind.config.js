/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#6366F1",
                secondary: "#F9FAFB",
                accent: "#22C55E",
            },
        },
    },
    plugins: [],
}

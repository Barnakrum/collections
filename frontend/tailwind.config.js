/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                text: "rgb(var(--color-text) / <alpha-value>)",
                background: "rgb(var(--color-background)/<alpha-value>)",
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary)/ <alpha-value>)",
                accent: "rgb(var(--color-accent)/<alpha-value>)",
                error: "rgb(var(--color-error)/<alpha-value>)",
            },
        },
    },
    plugins: [],
};

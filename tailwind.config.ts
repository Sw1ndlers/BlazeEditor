import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	plugins: ["prettier-plugin-tailwindcss", require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "sunset", "luxury", "dracula", "winter"]
    }
};
export default config;

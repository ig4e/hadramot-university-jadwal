/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./renderer/pages/**/*.{js,ts,jsx,tsx}",
		"./renderer/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"body": "Inter, Cairo, sans-serif"
			}
		},
	},
	plugins: [],
};

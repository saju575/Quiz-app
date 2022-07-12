module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/**/*.{html,js}",
		"./node_modules/tw-elements/dist/js/**/*.js",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("tw-elements/dist/plugin"),
		require("flowbite/plugin"),
		require("daisyui"),
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#0FCFEC",
					secondary: "#19D3AE",
					accent: "#3A4256",
					neutral: "#3d4451",
					"base-100": "#ffffff",
					"d-b": "#3A4256",
				},
			},
			// "dark",
			"autumn",
			// "cupcake",
		],
	},
};

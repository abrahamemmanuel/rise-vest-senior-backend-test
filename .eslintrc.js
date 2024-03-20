module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	parseOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	rules: {},
};

module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "prettier"],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'array-callback-return': 2,
		'no-useless-rename': 2,
		'prefer-const': 2,
		'no-console': 'off',
		'no-use-before-define': [2, 'nofunc'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: 'should|expect',
				argsIgnorePattern: 'req|res|next',
			},
		],
		curly: ["error", "multi-line"],
		'max-len': [2, 300, 4, { ignoreUrls: true }],
		'@typescript-eslint/no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
		'@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
		'@typescript-eslint/semi': ['error'],
		'@typescript-eslint/quotes': [
			'error',
			'double',
			{
				avoidEscape: true,
				allowTemplateLiterals: true,
			},
		],
		'prettier/prettier': 2,
	},
};

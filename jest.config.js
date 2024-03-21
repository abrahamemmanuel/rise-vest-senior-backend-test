// /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */ This is depricated
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testPathIgnorePatterns: ["/dist/"],
	moduleNameMapper: {
		"^src/(.*)$": "<rootDir>/$1",
	},
};

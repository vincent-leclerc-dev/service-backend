module.exports = {
  collectCoverageFrom: ['src/**/*.(t|j)s', '!**/node_modules/**'],
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: '../..',
  testEnvironment: 'node',
  testRegex: '.*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    modulePaths: ['.'],
    testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
    moduleNameMapper: {
        '\\.scss$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['./jest.setup.ts'],
};

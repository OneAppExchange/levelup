const { jestConfig } = require('lwc-services/lib/config/jestConfig');

const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    ...jestConfig,
    // Stubs for 3rd party components
    moduleNameMapper: {
        '^lightning/(.+)$': '<rootDir>/jest-mocks/lightning/$1/$1'
    },
    setupFilesAfterEnv
};

const { jestConfig } = require('lwc-services/lib/config/jestConfig');
//const { jestConfig } = require('@salesforce/lwc-jest/config');

const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    ...jestConfig,
    // Stubs for 3rd party components
    moduleNameMapper: {
        '^lightning/(.+)$': '<rootDir>/node_modules/@salesforce/lwc-jest/src/lightning-stubs/$1/$1'
    },
    setupFilesAfterEnv
};

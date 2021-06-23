# Sa11y

In order to test if our components are accesible, we have a sa11y jest plugin. 
Let's install it, going to root folder 

## Instalation

````
yarn add @sa11y/jest -D
````

## Configuration
There is another things to do, we need to change Jest configuration.  

````
touch jest.config.js
touch jest-sa11y-setup.js
````

And add the following content to  jest.config.js. Notice that here we start usign the default lwc configuration for Jest and we add a new file jest-sa11y-setup.js

````
const { jestConfig } = require('lwc-services/lib/config/jestConfig');

const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    ...jestConfig,
    // Stubs for 3rd party components
    moduleNameMapper: {
        '^ui/(.+)$': '<rootDir>/jest-mocks/ui/$1/$1'
    },
    setupFilesAfterEnv
};
````
and 

````
import { registerSa11yMatcher } from '@sa11y/jest';

registerSa11yMatcher();
````


## Usage

Sa11y give us the possibility to assert the following type of expressions:

````
expect(element).toBeAccessible()
`````

## Resources

* [Blog automated accessibility testing with Sa11y](https://developer.salesforce.com/blogs/2020/10/automated-accessibility-testing-with-sa11y.html).


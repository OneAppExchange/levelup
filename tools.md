
# Tools

One of the main advantages of moving to the NPM world is that there are a lot of open source tools to help us on the coding and testing. 
Let's start looking for some usefull 


## ESLint

## Prettier

## Husky


## Jest 
Jest is a leading platform for Testing and is install as part of the lwc. You may notice that we run jest when we run any of the following scripts:

    "test:unit": "lwc-services test:unit",
    "test:unit:coverage": "lwc-services test:unit --coverage",
    "test:unit:debug": "lwc-services test:unit --debug",
    "test:unit:watch": "lwc-services test:unit --watch",

The configuration file for Jest is in the following path: lwc-services/lib/config/jestConfig.


For example if you want to see the test coverage 
````
yarn test:unit:coverage
````


## Sa11y
In order to test if our components are accesible, we have a sa11y jest plugin. 
Let's install it, going to root folder 

````
yarn add @sa11y/jest -D
````

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

Sa11y give us the possibility to assert the following type of expressions:

````
expect(element).toBeAccessible()
`````

## Storybook
Storybook is a great tool for documenting and doing manual testing of components in an isolated way. Is very useful for Shared Libraries of components.

The difference with Jest, is that we need to install it, because isn't part of the lwc.

````
yarn add storybook -D
`````



## Webpack Bundle Analyzer

This visual tool is interesting to understand what we are deploying and the size of each library we are using. 

```bash
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```

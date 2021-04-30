
# Tools

One of the main advantages of moving to the NPM world is that there are a lot of open source tools to help us on the coding and testing. 
Let's start looking for some usefull 


## Ligthning Base Components
If we want to use ligthning components we need to install them. [npm link] (https://www.npmjs.com/package/lightning-base-components)

## ESLint

````
yarn add -D eslint
yarn add -D @salesforce/eslint-config-lwc
````

[VS Code Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Prettier
This package is already part of the LWC, but explicitily we can install it as dev dependency.

````
yarn add -D prettier
````

Now we can add prettier to eslint

````
yarn add -D eslint-config-prettier
yarn add -D eslint-plugin-prettier
````

[VS Code Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)


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
yarn add -D @sa11y/jest
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

To read more [visit blog](https://developer.salesforce.com/blogs/2020/10/automated-accessibility-testing-with-sa11y.html).


## Storybook
Storybook is a great tool for documenting and doing manual testing of components in an isolated way. Is very useful for Shared Libraries of components.
Another benefit of using Storybooks is that designers can use it as a sandbox where they can play with components before they are integrated to the application, so is good to rapid prototyping 

We need to install Storybook, because isn't part of the lwc as Jest. Here the command to run the cli tool

````
npx -p @storybook/cli sb init
`````

This tool will ask for the framework and we need to choose webcomponents. Based on that will install a list of dependencies and some configuration and example files that for our purpose we will delete (the folder stories inside src folder).

    "@babel/core": "^7.13.15",
    "@storybook/addon-actions": "^6.2.8",
    "@storybook/addon-essentials": "^6.2.8",
    "@storybook/addon-links": "^6.2.8",
    "@storybook/web-components": "^6.2.8",
    "babel-loader": "^8.2.2",
    "lit-html": "^1.3.0",

Also added a script on our package.json  with the following command. 

    "storybook": "start-storybook -p 6006",


And a hidden folder .storybook with main.js and preview.js

We will need to do some changes in the configuration files.

````
const LWCWebpackPlugin = require('lwc-webpack-plugin');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    '@storybook/addon-a11y',
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Override default rules, prevents issues related to loading CSS files.
    
    config.plugins.push(
      new LWCWebpackPlugin()
    );

    config.module.rules = config.module.rules.filter(
      f => f.test.toString() !== '/\\.css$/'
    );   
    
    return config;
  }
};

````

[Read more](https://github.com/LWC-Essentials/storybook)

## Webpack Bundle Analyzer

This visual tool is interesting to understand what we are deploying and the size of each library we are using. 

```bash
# NPM
npm install --save-dev webpack-bundle-analyzer
# Yarn
yarn add -D webpack-bundle-analyzer
```

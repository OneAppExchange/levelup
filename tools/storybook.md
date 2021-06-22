# Storybook

Storybook is a great tool for documenting and doing manual testing of components in an isolated way. Is very useful for Shared Libraries of components.
Another benefit of using Storybooks is that designers can use it as a sandbox where they can play with components before they are integrated to the application, so is good to rapid prototyping 


## Instalation
We need to install Storybook, because isn't part of the lwc as Jest. Here the command to run the cli tool

````
npx -p @storybook/cli sb init
`````

## Configuration

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

## Usage



## Resources

* [Storybook & LWC gitHub repo](https://github.com/LWC-Essentials/storybook)

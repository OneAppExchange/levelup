# JEST 


## Instalation

## Configuration
Jest is a leading platform for Testing and is install as part of the lwc. You may notice that we run jest when we run any of the following scripts:

    "test:unit": "lwc-services test:unit",
    "test:unit:coverage": "lwc-services test:unit --coverage",
    "test:unit:debug": "lwc-services test:unit --debug",
    "test:unit:watch": "lwc-services test:unit --watch",

The configuration file for Jest is in the following path: lwc-services/lib/config/jestConfig.

## Usage

For example if you want to see the test coverage 
````
yarn test:unit:coverage
````
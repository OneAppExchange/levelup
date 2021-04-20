# Lesson 3
The goal of this lesson will be to add some "color" and start using the lightning-base-components. 

We can create our components or we can use external libraries. The lwc provides a mechanism to resolve 


## Installing & Configuring
Before coding we will need to install the ligthning base components

````
yarn add -D lightning-base-components
````

After that we need to tell lwc that we are using a library, so module resolution can go there. For more information of module resolution visit [lwc site](https://lwc.dev/guide/es_modules#module-resolution) and more technicall in the [RFC](https://rfcs.lwc.dev/rfcs/lwc/0020-module-resolution)

So, let go and edit the lwc.config.js and add the npm resolution for lightning-base-components

````
{
    "modules": [
        {
            "dir": "src/modules"
        },
        {
            "npm": "lightning-base-components"
        }       
    ],
    "expose": [
        "pricing/view"
    ]
}

````

## Coding


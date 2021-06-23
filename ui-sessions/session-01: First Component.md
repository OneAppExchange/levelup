# Session 1: First Component
The goal of this document will be goind step by step and see our first Hello World component working.


## Installing 
We can use npx create-lwc-app to create a new LWC App, but in order to understand deeper what this is doing and what are each of the files we will do a step by step and create each file, of course you can skip it going to the code folder.


### Create package.json 
We can use yarn or npm or just touch package.json and edit. For more information of structure read [npm](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#engines)

```bash
yarn init
```

### Create the gitignore
```bash
$ touch .gitignore
```

Edit the file with the following content
```
# Log files
logs
*.log
*-debug.log
*-error.log

# Standard lib folder
/lib

# Standard dist folder
/dist

# Tooling files
node_modules

# Temp directory
/tmp

# Jest coverage folder
/coverage

# MacOS system files
.DS_Store

# Windows system files
Thumbs.db
ehthumbs.db
[Dd]esktop.ini
$RECYCLE.BIN/
```

### Install LWC Runtime

```bash
yarn add -D  lwc-services
```

Notice the node_module folder and that we can run lwc-services commmand line using for example npx lwc-services watch

*USAGE*
  $ lwc-services [COMMAND] [OPTIONS]

*COMMANDS*
  test  Runs Jest tests for Lightning Web Components
  build  Creates a new build
  help   display help for lwc-services
  sniff  Exports configuration information as JS files
  watch  Runs a Lightning Web Components project in watch mode

read more about [command line commands and options](https://github.com/muenzpraeger/create-lwc-app)



### Add Scripts to package.json

A startdard way is to create the a tag scripts on package.json with all the commands that we will use. Now we are adding the lwc so no need to call via npx and remmember all the options


The lwc-services can use webpack or rollup as bundeler

Lets add the following scripts to package.json
```
  "scripts": {
      "build": "lwc-services build -m production",
      "build:development": "lwc-services build",
      "test:unit": "lwc-services test:unit",
      "test:unit:coverage": "lwc-services test:unit --coverage",
      "test:unit:debug": "lwc-services test:unit --debug",
      "test:unit:watch": "lwc-services test:unit --watch",
      "watch": "lwc-services watch"
  }
```


In case we want to use rollup we will append **-b rollup**. And in case we need webpack addtional config we append **-w route-to/webpack.config.js**.  
For more info of the webpack config file [click here](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) 

Let's create the lwc-service config file

In the root folder we create the config file

```bash
touch lwc-service.config.js
```

Add this content to lwc-service.config.js ( for more information of this config file [click here](https://github.com/muenzpraeger/create-lwc-app/blob/main/packages/lwc-services/example/lwc-services.config.js) )

```
module.exports = {
    resources: [{ from: 'src/resources/', to: 'dist/resources/' }]
};
```

### Module Resolution
There are two ways: 

- Add a lwc.config.json file at the root of the project.
- Add an lwc key to the package.json file.


```bash
touch lwc.config.json
```

```
{
    "modules": [
        {
            "dir": "src/modules"
        }
    ]
}
```


## Coding

Create basic Folder for a new LWC, in this case our component is View and the namespace is Pricing

```bash
mkdir -p src/modules/pricing/view
cd src/modules/pricing/view
```

```bash
touch view.html
touch view.css
touch view.js
```

Now lets add the content to those files

view.css
```
.title {
    color: red;
    font-family: monospace;
    margin-top: 30px;
}
```

view.html
```
<template>
    <div class="title">
        Hello World !
    </div>
</template>
```


view.js
```
import { LightningElement } from 'lwc';

export default class View extends LightningElement {}
```


And now lets create the index.html that will render that component in the src folder

```bash
$ touch index.html
$ touch index.js
```

index.html
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>My LWC App</title>
        <style>
            body {
                font-family: Arial, Helvetica, sans-serif;
            }
        </style>
        <!-- Block zoom -->
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="shortcut icon" href="./resources/favicon.ico" />
        
    </head>
    <body>
        
        <div id="main"></div>
        
        <script src="./main.js"></script>
        
    </body>
</html>
```

index.js
```
import { createElement } from 'lwc';
import MyPricing from  'pricing/view';

const app = createElement('pricing-view', { is: MyPricing });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
```


So far we know that our pricing-view component is a html file, a css and javsacript. 

The html file is the template of the web component. For understanding more about web templates [click here](https://www.html5rocks.com/en/tutorials/webcomponents/template/) 

In our template file we will replace "World" for {name}, and in our Javascript we will create a new property name with the value "World". 
So our component will look like 

````
<template>
    <div class="title">
        Hello {name} !
    </div>
</template>
````

````
import { LightningElement } from 'lwc';

export default class View extends LightningElement {
    name = 'World';
}
````

The property name is private, in case we want to set as public we need to add the @api decorator, this enable other components to access to this property.
For more information [click here](https://lwc.dev/guide/html_templates#data-binding)


## Testing
Let's add the testing for this component. We will use Jest, and the standard way of creating test will be a subfolder named "__test__".

````
mkdir __tests__
cd __tests__
touch view.test.js
````

And now let's add the following content

````
import { createElement } from 'lwc';
import View from 'pricing/view';

describe('pricing-view', () => {
    it('displays hello', () => {
        // Create element
        const element = createElement('pricing-view', {
            is: View
        });
        document.body.appendChild(element);

        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Hello World !');
    });    
});
````

Let's create a new test case, to check if it's accessible. Before that we need to install the @sa11y/jest (see tools for more info [click here](./tools.md#sa11y) ). 

Now we can add a new test case for accesibility, but notice that we added also and afterEach that is important to "reset" the dom.

````
import { createElement } from 'lwc';
import View from 'pricing/view';

describe('pricing-view', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('displays hello', () => {
        // Create element
        const element = createElement('pricing-view', {
            is: View
        });
        document.body.appendChild(element);

        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Hello World !');
    });

    it('is accessible', () => {
        const element = createElement('pricing-view', {
            is: View
        });

        document.body.appendChild(element);

        return Promise.resolve().then(() => expect(element).toBeAccessible());
    });
    
});
````

## Documenting
We will used a tool called Storybook, before this we need to install it (see tools for more info [click here](./tools.md#storybook) 

Now let's create the folder for our stories inside our component folder and write our first Story. 

````
mkdir __stories__
cd __stories__
touch basic.stories.js
````

Now we will create a first version for see how content is render. Lets just export a title "Pricing View" and two stories.

````
import component from  'pricing/view';

customElements.define('pricing-view', component.CustomElementConstructor);

export default {
    title: 'Components/Pricing/View'
};

export const Basic = () => `<h1>Basic</h1> 
    Here we document our component for the most common use case
    <pricing-view></pricing-view`;

export const Advance = () => `<h1>Advance</h1> 
    Here we document our component but is the advance use case
    <pricing-view></pricing-view
    `;
````

now let's change title for 'Pricing/View' to see how grouping works. We can group multiple levels, depending de number of levels how will render. Try adding another level "Components/Pricing/View" and notice that now appear a new grouping. 







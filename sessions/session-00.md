# Session 0
The goal of this session 0 or presssion is to have a guide for install basic tools before starting.


## Create package.json 
We can use yarn or npm or just touch package.json and edit. For more information of structure read [npm](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#engines)

```bash
$ yarn init
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

## Install LWC Runtime

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



## Add Scripts to package.json

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
$ touch lwc-service.config.js
```

Add this content to lwc-service.config.js ( for more information of this config file [click here](https://github.com/muenzpraeger/create-lwc-app/blob/main/packages/lwc-services/example/lwc-services.config.js) )

```
module.exports = {
    resources: [{ from: 'src/resources/', to: 'dist/resources/' }]
};
```

## Module Resolution
There are two ways: 

- Add a lwc.config.json file at the root of the project.
- Add an lwc key to the package.json file.


```bash
$ touch lwc.config.json
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



## Create basic Folder for LWC

```bash
$ mkdir -p src/modules/pricing/view
$ cd src/modules/pricing/view
```

```bash
$ touch view.html
$ touch view.css
$ touch view.js
$ mkdir __test__
$ mkdir __stories__
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

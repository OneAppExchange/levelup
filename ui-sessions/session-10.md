# Session 10: I18N

The goal of this level up is to go through how we can translate custom labels. We will use and explore the package that is published in the OneAppExchange


## Install 

First of all let's install the package, as is a private packege we need to create the following file in the root directoty

.npmrc
````
# Generate a token with read/write/delete:packages permissions and export from your ~/.bash_profile
# https://github.com/settings/tokens
@OneAppExchange:registry=https://npm.pkg.github.com
@oneappexchange:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
````



If you dont have a github token please follow the link [click here](https://github.com/settings/tokens).

Make sure you export the token in the bash_profile (may be ~/.bash_profile or ~/.zshrc) under the GITHUB_PACKAGES_TOKEN. You will need to add a line like 
````
export GITHUB_PACKAGES_TOKEN=<<GITHUBTOKEN FROM https://github.com/settings/tokens>>
````


To validate is ok, verify that the terminal is showing the token with this command
````
echo $GITHUB_PACKAGES_TOKEN
````

now we can install it !

````
yarn add -D @oneappexchange/lwc-wired-i18n
````


## Configuration


### Create the Translations files
First we will create the static content with the custom labels
Create a folder name messages under the src folder with two translation files

````
mkdir messages
cd messages
touch en.json
touch es.json
````

In the English file

````
{
    "search_books": "search books",
    "next": "next",
    "previous": "previous"
}
````

And in the Spanish file

````
{
    "search_books": "buscar libros",
    "next": "siguiente",
    "previous": "anterior"
}
````

### Configure the bundler tool
In the bundeler tool we need to configure the message library. If we use webpack we need to add the following rule to the module configuration

````
const { env } = require('process');

path = require('path');

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            // To generate a different build for each language, set the DEFAULT_LANGUAGE environment variable
            '@i18n$': path.resolve(__dirname, 'src/messages/en.json')
        }
    },
    module: {
        rules: [
          {
            test: [/\bmessages\.(json|ya?ml)$/, /\.properties$/],
            type: 'javascript/auto', // required by Webpack for JSON files
            use: [
                    {
                        loader: '@messageformat/loader',    
                        options: { locale: ['en','es'] }        
                    }
                ]
            }
        ]    
    }
};
````

Notice the bundeler is converting the json translations files into javascript and adding this to the final javascript code.

More information you can read [here](http://messageformat.github.io/messageformat/webpack/).


## Code

### Create the Wire Adapter
In the src/modules/utils folder

````
mkdir wireI18n
cd wireI18n
touch wireI18n.ts
````

Now lets add the code

````
import bundledI18n from '../../../messages/en.json';
import { createI18nStore, createWireI18n } from '@oneappexchange/lwc-wired-i18n';

export const i18nStore = createI18nStore({
    bundledI18n,
    defaultLanguage: 'en',  
    i18nModuleLoaders: {
        // Add additional languages here
        en: () => import('../../../messages/en.json'),
        es: () => import('../../../messages/es.json')
    },
    developmentMode: process.env.NODE_ENV !== 'production'
});

export const WireI18n = createWireI18n(i18nStore);
````

Now lets do some refactor to our component

````
import { WireI18n } from 'utils/wireI18n';
````



````
    labels;
    @wire(WireI18n)
    i18nCallback(i18n) {
        this.labels = i18n;
        console.log(this.labels);
        console.log(this.labels.next);        
    }
````


And in the html  we replace the hardcode text for 

````
    {labels.search_books}
````


# Basics
The goal of this document will be learning lwc by adding functionality to our component.

## Binding
So far we know that our pricing-view component is a html file, a css and javsacript. 

The html file is the template of the web component. For understanding more about web templates [click here](https://www.html5rocks.com/en/tutorials/webcomponents/template/) 

In our template file we will replace "Worl" for {name}, and in our Javascript we will create a new property name with the value "World". 
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


### Add testing to our component
Let's add the testing for this component. We will use Jest, and the standard way of creating test will be a subfolder named "__test__".

````
mkdir __test__
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

Let's create a new test case, to check if it's accessible. Before that we need to install the @sa11y/jest. 

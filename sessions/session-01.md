# Session 1
The goal of this document will be goind step by step and see our first Hello Worl component working.


## Coding
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







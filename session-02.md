# Session 2
Now what we will do is to add the avility to create a lwc but changing the name.

## Coding
We will use our first decorator @api.  This decorator is binding a Javascript property with a Template property, so now the template has a property called name, and we can set a value from the template.


````
import { LightningElement } from 'lwc';

export default class View extends LightningElement {
    @api name = 'World';
}
````

## See in action
Let's go to our index.html and change our "hello World!" into a "hello Team!"


````
  <pricing-view name="team"></pricing-view>
````


## Testing

Now let's add a new test case 

````
    it('displays hello my friends', () => {
        // Create element
        const element = createElement('pricing-view', {
            is: View
        });
        element.name = "my friends";

        document.body.appendChild(element);

        // Verify displayed greeting
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Hello my friends !');
    });
````

## Documenting

Let's add some magic to our Component Library and add this avility to dinamically change the name

Now let's change our basic.stories.js to look like: 
````
import component from  'pricing/view';

customElements.define('pricing-view', component.CustomElementConstructor);

export default {
    title: 'Components/Pricing/View',
    argTypes: {
        name: { control: 'text' , defaultValue: 'World'}
      },    
};

export const Basic = () => `<h1>Basic</h1> 
    Here we document our component for the most common use case
    <pricing-view name="Mundo" ></pricing-view`;

export const Advance = ({name}) => `<h1>Advance</h1> 
    Here we document our component but is the advance use case
    <pricing-view name="${name}" ></pricing-view
    `;

````

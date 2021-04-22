# Session 4
Now lets introduce Component Life cycle Hooks.

Web components has the posibility to create callbacks on some life cycle events. The web component hooks are:
* **connectedCallback**: Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed. 
* **disconnectedCallback**: Invoked each time the custom element is disconnected from the document's DOM.
* **adoptedCallback: Invoked each time the custom element is moved to a new document.
* **attributeChangedCallback**: Invoked each time one of the custom element's attributes is added, removed, or changed. Which attributes to notice change for is specified in a static get observedAttributes method

LWC extends and simplifies. Lets check the LWC Life cycle hooks:
* **constructor**: method fires when a component instance is created. Don’t add attributes to the host element during construction. You can add attributes to the host element in any other lifecycle hook.
Run Code When a Component Is Inserted or Removed from the DOM
* **connectedCallback**: lifecycle hook fires when a component is inserted into the DOM
* **renderedCallback**: is *unique to Lightning Web Components*. Use it to perform logic after a component has finished the rendering phase.
* **errorCallback**: is *unique to Lightning Web Components*. Implement it to create an error boundary component that captures errors in all the descendent components in its tree. It captures errors that occur in the descendant's lifecycle hooks or during an event handler declared in an HTML template. You can code the error boundary component to log stack information and render an alternative view to tell users what happened and what to do next.
* **disConnectedCallback**: lifecycle hook fires when a component is removed from the DOM.
Run Code When a Component Renders


## Coding

````
<template>
    <div class="pricing-title">
        Hello {name} !
    </div>
    <div>
        {reverseName}
    </div>

    <template for:each={countLogs} for:item="log">
        <li key={log.clickNum}>
          {log.time}
        </li>
    </template>

        
    <lightning-button label="Button" onclick={handleButton}></lightning-button>

    <lightning-input label="Name" value={name} onchange={handleChange}></lightning-input>
</template>
````

````
import { LightningElement, api , track} from 'lwc';

export default class View extends LightningElement {
    @api name = 'World';
    countClicks = 0;
    /* @track */ countLogs = []; 

    handleChange(event) {
        console.log('handle Change' );
        this.name = event.target.value;
    }

    handleButton(event) {
        console.log('handle Button' );
        this.countClicks++;        
        this.countLogs.push( { clickNum: this.countClicks , time: new Date() } );
    }

    constructor() {
        super();
        console.log('Constructor' );
    }
    
    connectedCallback() {
        console.log('Connected');
    }
    
    renderedCallback() {
        console.log('Render');
    }
    
    errorCallback(error, stack) {
        console.log('Error' + error);       
    }
    
    disconnectedCallback() {
        console.log('Disconnected');
    }
    
    get reverseName() {
        console.log('Reverse Property with value: ' + this.name ); 
        //console.log('Reverse Property with Count Clicks: ' + this.countClicks ); 
        return this.name.split("").reverse().join("");
    }    
    
}
`````

## See in action

Lets add some logic to our container. We will add two buttons for changing the property and destroy the element

`````
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
        <link  rel="stylesheet" href="SLDS/styles/salesforce-lightning-design-system.min.css" />        
    </head>
    <body>
    
    <pricing-view name="team"></pricing-view>

    <button id="change">Change Attributes</button> 
    <button id="destroy">Destroy</button> 
</body>
</html>
`````

`````
import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import MyPricing from  'pricing/view';

customElements.define('pricing-view', MyPricing.CustomElementConstructor);


const destroy = () => {
    let element = document.getElementsByTagName("pricing-view")[0];
    element.parentElement.removeChild(element);
};
const change = () => {
    let element = document.getElementsByTagName("pricing-view")[0];
    element.name = (new Date()).toString();
};

document.getElementById('destroy').addEventListener( "click", destroy);
document.getElementById('change').addEventListener( "click", change);

export { createElement, MyPricing };
`````

Lets uncomment the console log of countClicks and see that render will be trigger with button click

Lets uncomment the track and see now how the reactivity changes with the click


## Resources
* [Life cycle hooks](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_lifecycle_hooks

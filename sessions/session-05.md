# Session 5
This session we will deep dive in the composition.

## Coding
Lets try to breakup the component into to different. 

In the src/modules/pricing folder let's create a new component
````
mkdir item
mkdir -p item/__tests__
mkdir -p item/__stories__
touch item/item.html
touch item/item.js
````

Lets split and add some logic to our Log Item


````
import { LightningElement, api} from 'lwc';

export default class Item extends LightningElement {
    @api time = new Date();
 
    get formatDate( ){
        const months = [ 'Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return this.time.getDate() + ' ' + months[this.time.getMonth()] + ' of ' + this.time.getFullYear() ;
    }
    get formatTime( ){
        return this.time.getHours() + ':' +  this.time.getMinutes() + ':' +  this.time.getSeconds();
    }
}
````

````
<template>
    <li>
        {formatDate} => {formatTime}
    </li>
</template>
````

````
  <ul>
      <template for:each={countLogs} for:item="log">
          <pricing-item key={log.clickNum} time={log.time}></pricing-item>
      </template>    
    </ul>
````

This looks tightly couple solution, so let's continue defining more components with a more clear resposanbility. What is now we create a container





## Resource
* [Slots in Web Comoponents Spanish] (https://lenguajejs.com/webcomponents/nativos/slots/) 
* [Templates & Slots] (https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
* [Composition Reference] (https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_compose_intro)
* [Composition Guide] (https://lwc.dev/guide/composition)
* [Composition Recipes] (https://recipes.lwc.dev/#composition)

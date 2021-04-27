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


item.js
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

item.html
````
<template>
    <li>
        {formatDate} => {formatTime}
    </li>
</template>
````

view.html
````
  <ul>
      <template for:each={countLogs} for:item="log">
          <pricing-item key={log.clickNum} time={log.time}></pricing-item>
      </template>    
    </ul>
````

Let's now move some logic to an utility. Go to modules folder and create a list component

````
mkdir list
mkdir -p list/__tests__
mkdir -p list/__stories__
touch list/list.html
touch list/list.js
````


list.js
````
import { LightningElement, api , track} from 'lwc';

export default class List extends LightningElement {

    handleSlotChange( event ) {
        console.log(event)
    }
}
````

list.html
````
<template>
    <div class="header">
        <slot name="header">Header</slot>    
    </div>
    <div class="body">
        <slot onslotchange={handleSlotChange}></slot>
    </div>
    <div class="footer">
        <slot name="footer">Footer</slot>    
    </div>
</template>
````

list.css
````
.header {
    background-color: aqua;
    font-size: large;
    text-align: center;
    padding: 3px;
}

.body {
    background-color:bisque;    
}

.footer {
    background-color: aqua;
    text-align: center;
    padding: 3px;
}
````

item.html
````
<template>
    <p>
       <b>Date:</b> {formatDate} 
    </p>
    <p>
        <b>Time:</b> {formatTime}
    </p>        
</template>
````

view.html
````
   <utils-list>
            <div slot="header">
                New Header total clicks {countClicks}
            </div>    
            <template for:each={countLogs} for:item="log">
                <pricing-item key={log.clickNum} time={log.time}></pricing-item>
            </template>    
            <div slot="footer">
                <lightning-button label="Add" onclick={handleButton}></lightning-button>
            </div>    
    </utils-list>    

````

## Resource
* [Slots in Web Comoponents Spanish] (https://lenguajejs.com/webcomponents/nativos/slots/) 
* [Templates & Slots] (https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
* [Composition Reference] (https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_compose_intro)
* [Composition Guide] (https://lwc.dev/guide/composition)
* [Composition Recipes] (https://recipes.lwc.dev/#composition)
* [Trailhead using composition] (https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components?trail_id=build-lightning-web-components)

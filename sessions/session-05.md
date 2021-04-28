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

### Split the component in two
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

### Using Slots
Let's introduce the concept of Slots, This is also something that is from Web components ( [read more] (https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots) )

LWC has named and unnamed Slots. Named slots reminds me the Site Template merge and the facets that we were used in Visual Force. To read more about Slots on LWC we can [go to reference] (https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_slots)


Let's now move some logic to an utility, so we can see also how insert components from other namespace. Go to modules folder and create a list component

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

And to see this in action, let's change our item and view components

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

### Calling methods on Child components
To see more information [go to guide] (https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_javascript_methods).

So the first thing is to add some logic in the child, in our case let's suppose that we add some method to hide the date

We will add a public method (notice the @api decorator). And in the template we will put the conditional
item.js
````
    showDate = true;

    @api toogleDate() {
        this.showDate = !this.showDate;
    }
````

`````
    <template if:true={showDate}>
        <p>
           <b>Date:</b> {formatDate} 
        </p>
    </template>
````

And in our View component we will add a button Show/Hide that will trigger a handler, who will call the childs methods

view.html
````
    <lightning-button label="toogle" onclick={handleToogleDates}></lightning-button>
````

view.js
````
    handleToogleDates() {
        const items = this.template.querySelectorAll('pricing-item');
        items.forEach( item => {
            item.toogleDate();
        })
    }
````

Supposed we like the toogle but at for each item, so we will need to call a toogle handler sending the item reference. Here a possible solution to that problem

on the html side we nee to add a button, but we need to put it inside a div, because we can't have two childs in the foreach
````
    <template for:each={countLogs} for:item="log" for:index="index">
        <div key={log.clickNum}>
            <pricing-item time={log.time}></pricing-item>
            <lightning-button data-index={index} label="toogle" onclick={handleToogleDate}></lightning-button>
        </div>
    </template>    
````

Notice that in the html we added a custom attribute data-index and we set the index of the loop. Now in the new handler we can access that data.

`````
    handleToogleDate(event) {
        const index = event.target.dataset.index;
        const items = this.template.querySelectorAll('pricing-item');
        items[index].toogleDate();
    }
`````



## Resource
* [Slots in Web Comoponents Spanish] (https://lenguajejs.com/webcomponents/nativos/slots/) 
* [Templates & Slots] (https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)
* [Composition Reference] (https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_compose_intro)
* [Composition Guide] (https://lwc.dev/guide/composition)
* [Composition Recipes] (https://recipes.lwc.dev/#composition)
* [Trailhead using composition] (https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components?trail_id=build-lightning-web-components)

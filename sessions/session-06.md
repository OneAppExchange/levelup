# Session 6
In this session we will cover Custom Events and how components can communicate between each other

## Coding

### Communication between Child to Parent

In a simple way we say tha properties goes down while events goes up. So we will see how a child can send information to the parent using events. In html we are use to events, but is good to remember that in a nested structure the event life cycle has capture phase from top to bottom, then a target phase when the event reaches the element that fires the event, and finally a bubling phase where the event goes up so it can be handle by any parent of the element. 

We will use custom events, that is the standard way to create our own events, and the parent of our component can listen it.

#### Without sending data
We can send data in the event, in case we dont want, we can create event with:

````
  this.dispatchEvent( new CustomEvent('selected') );
````

In our example we can go to our item.js and create an event on the toogle
````
    @api toogleDate() {
        this.showDate = !this.showDate;
        this.dispatchEvent( new CustomEvent('toogle') );
    }
````

Now in the parent we will need to listen the event. There are two ways, on is to use html to bind the event with handler and the other is use addEvenListener in the constuctor( ). Let's see the first one how will be:

````
  <pricing-item time={log.time} ontoogle={handleToogleInTheParent}></pricing-item>
````

and in the view.js we need to code a handler

````
    handleToogleInTheParent() {
        console.log('handleToogleInTheParent');
    }
````

#### Sending data in the event 
We can send a second parameter. There is warning in this parameter, if the data isn't primitive goes by reference, so in that case is need we recommend to clone before sending, to avoid undesirable behaviours

replace in the item.js:9
````
    @api toogleDate() {
        this.showDate = !this.showDate;
        this.dispatchEvent( new CustomEvent('toogle', { detail: { showDate: this.showDate} }) );
    }
````

in the view.js
````
    handleToogleInTheParent() {
        console.log('handleToogleInTheParent' + event.detail.showDate);
    }
````

To do something more usefull we can try to change the button label from show and hide.



For more examples [go to receipes](https://recipes.lwc.dev/#child) or check the [trailhead](https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components?trail_id=build-lightning-web-components).

### Communication between Parent to Child


### Api Property

Notice is read only

### Api Function

### Api Getter Setter



For more examples [go to receipes](https://recipes.lwc.dev/#parent)

### Communication between unrelated components


## Resources
* [Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/Javascript/Building_Blocks/events)
* [Custom Events MDN](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)
* [Trailhead DX of LWC Communication Patterns](https://www.youtube.com/watch?v=kGKL1sIDIho)
* [Events Guide](https://lwc.dev/guide/events#configure-event-propagation)
* [Communication with Events](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.events)
* [Pluralsight](https://app.pluralsight.com/library/courses/communicate-between-salesforce-lightning-web-components/table-of-contents)
* [Trailhead](https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components?trail_id=build-lightning-web-components)

# Session 6: Events
In this session we will cover Custom Events and how components can communicate between each other

## Coding

### Communication between Child to Parent

In a simple way we say tha properties goes down while events goes up. So we will see how a child can send information to the parent using events. In html we are use to events, but is good to remember that in a nested structure the event life cycle has capture phase from top to bottom, then a target phase when the event reaches the element that fires the event, and finally a bubling phase where the event goes up so it can be handle by any parent of the element. 

We will use custom events, that is the standard way to create our own events, and the parent of our component can listen it.

#### Simple
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

You can also see a recipe example:
* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/eventSimple)
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/paginator)


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



You can also see a recipe example:
* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/eventWithData)
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/contactListItem)

### Event Bubbling

You can also see a recipe example:
* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/eventBubbling)
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/contactListItemBubbling)


For more examples go to [trailhead](https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components?trail_id=build-lightning-web-components).

### Communication between Parent to Child
As we said Child to parent communication used events, and Parent to Child use public propeties. So remember that for creating public properties or methods we use the @api decorator ( [Session 2](https://github.com/sebastianclaros/levelup-lwc/blob/main/sessions/session-02.md) ).

Let's see 3 different ways

### Api Property
In this case the parent will communicate with the child updating a property value


view.html (parent) 
````
    <pricing-item time={log.time} ontoogle={handleToogleInTheParent}></pricing-item>
````

item.js (child)
````
    @api time = new Date();
````


Notice that properties allows only one direction of changes. To read more you can [go to guide](https://lwc.dev/guide/composition#objects-passed-to-components-are-read-only)

You can also see a recipe example:
* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/apiProperty)
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/chartBar)

### Api Function
In this case the parent will communicate with the child calling a method. To read more you can go to [guide](https://lwc.dev/guide/composition#call-a-method-on-a-child-component).


view.js (parent)
````
    handleToogleDates() {
        const items = this.template.querySelectorAll('pricing-item');
        items.forEach( item => {
            item.toogleDate();
        })
    }
    
    handleToogleDate(event) {
        const index = event.target.dataset.index;
        const items = this.template.querySelectorAll('pricing-item');
        items[index].toogleDate();
    }
````

item.js (child)
````
    @api toogleDate() {
        this.showDate = !this.showDate;
        this.dispatchEvent( new CustomEvent('toogle', { detail: { showDate: this.showDate} }) );
    }
````

You can also see a recipe example:
* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/apiFunction)
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/clock)

### Api Getter Setter
In this case the parent will communicate with the child using a getter and setter.


view.html (parent)
````
<lightning-input type="toggle" checked onclick={handleShowHideDates} label="Date option" message-toggle-active="show" message-toggle-inactive="hide"></lightning-input>
````

view.js (parent)
````
    handleShowHideDates(event) {
        const items = this.template.querySelectorAll('pricing-item');
        console.log(event.target.checked);

        items.forEach( item => {
            item.showDate = event.target.checked;
        })
    }
````

item.js (child)
````
    _showDate = true;

    get showDate() {
        return this._showDate;
    }

    @api set showDate( value ) {
        this._showDate = value;
        this.dispatchEvent( new CustomEvent('toogle', { detail: { showDate: this._showDate} }) );
    }

    @api toogleDate() {
        this._showDate = !this._showDate;
        this.dispatchEvent( new CustomEvent('toogle', { detail: { showDate: this._showDate} }) );
    }

````

You can also see a recipe example:
* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/apiSetterGetter)
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/todoList)


### Communication between unrelated components
Communication between unrelated components needs to go across the DOM. In the past there was a pubsub library, but now we can use the LMS (Ligthning Messaging Service)

There are three steps first is to create a channel, then publish (who emmit the communication) and finally subscribe (who recibes that communication). Is an event bus pattern.



## Resources
* [Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/Javascript/Building_Blocks/events)
* [Custom Events MDN](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)
* [Trailhead DX of LWC Communication Patterns](https://www.youtube.com/watch?v=kGKL1sIDIho)
* [Events Guide](https://lwc.dev/guide/events#configure-event-propagation)
* [Communication with Events](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.events)
* [Pluralsight](https://app.pluralsight.com/library/courses/communicate-between-salesforce-lightning-web-components/table-of-contents)
* [Trailhead](https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components?trail_id=build-lightning-web-components)

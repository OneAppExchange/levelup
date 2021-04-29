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

You can also see a recipe example [click here live](https://recipes.lwc.dev/#child):
* [Child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/paginator)

*paginator.js*
````
    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }
````

* [Parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/eventSimple)

eventSimple.html
````
<recipe-paginator onprevious={handlePrevious} onnext={handleNext} ></recipe-paginator>
````

#### Sending data in the event 
Custom Event inherits from Event ( read more in  [MDN Custom Event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
We can send in the second parameter the detail argument. There is warning in this, if the data isn't primitive goes by reference, so in that case is need we recommend to clone before sending, to avoid undesirable behaviours

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


You can also see a recipe example [click here live](https://recipes.lwc.dev/#child):
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/contactListItem)

contactListItem.js 
````
   handleClick(event) {
        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        // 2. Read about event best practices at http://lwc.dev/guide/events#pass-data-in-events
        const selectEvent = new CustomEvent('select', {
            detail: this.contact.Id
        });
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
    }
````
* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/eventWithData)

eventWithData.html
````
<recipe-contact-list-item key={contact.Id} contact={contact} onselect={handleSelect} ></recipe-contact-list-item>
````

eventWithData.js
````
handleSelect(event) {
    const contactId = event.detail;
    this.selectedContact = this.contacts.data.find(
        (contact) => contact.Id === contactId
    );
}
````


### Event Bubbling
If we add bubbles: true, the event will go up until some parent element handle it. So let's do that.

If an event bubbles up and crosses the shadow boundary, to hide the internal details of the component that dispatched the event, some property values change to match the scope of the listener. See [Event Retargeting](https://lwc.dev/guide/events#get-an-event-target).


item.js
````
  this.dispatchEvent( new CustomEvent('toogle', { bubbles: true }) );
````

view.html (move the handleToogleInTheParent to the a new div 
````
    <div ontoogle={handleToogleInTheParent}>
        <utils-list>
          ...
        </utils-list>
    </div>
````

in the view.js we change the log, now we access the data via target (points to the lwc component that trigger the event)
````
    console.log('handleToogleInTheParent' + event.target.showDate);
````

You can also see a recipe example [click here live](https://recipes.lwc.dev/#child):
* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/contactListItemBubbling)

contactListItemBubbling.js
````
 handleSelect(event) {
        // 1. Prevent default behavior of anchor tag click which is to navigate to the href url
        event.preventDefault();
        // 2. Create a custom event that bubbles. Read about event best practices at https://lwc.dev/guide/events#configure-event-propagation
        const selectEvent = new CustomEvent('contactselect', {
            bubbles: true
        });
        // 3. Fire the custom event
        this.dispatchEvent(selectEvent);
    }
````

* [parent](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/eventBubbling)

eventBubbling.html (notice that oncontactselect is on the div)
````
<div class="contact-list" oncontactselect={handleContactSelect}>
    <template for:each={contacts.data} for:item="contact">
        <recipe-contact-list-item-bubbling key={contact.Id} contact={contact} ></recipe-contact-list-item-bubbling>
    </template>
</div>
````

eventBubbling.js (notice that is using target.contact )
````
   handleContactSelect(event) {
        this.selectedContact = event.target.contact;
    }
````
    
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

apiProperty.html
````
    <recipe-chart-bar percentage={percentage}></recipe-chart-bar>
````

* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/chartBar)

chartBar.js
````
    @api percentage;
````


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

apiFunction.html
````
    <ui-button label="Refresh Time" onclick={handleRefresh}></ui-button>
    <recipe-clock></recipe-clock>
````
apiFunction.js
````
        this.template.querySelector('recipe-clock').refresh();
````

* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/clock)

````
 @api refresh() {
      this.timestamp = new Date().toISOString();
  }
````

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

apiSetterGetter.html
````
  <recipe-todo-list todos={todos}></recipe-todo-list>
````

* [child](https://github.com/trailheadapps/lwc-recipes-oss/tree/main/src/modules/recipe/todoList)

todoList.js
````
@api
    get todos() {
        return this._todos;
    }
    set todos(value) {
        this._todos = value;
        this.filterTodos();
    }
````

### Communication between unrelated components 
Communication between unrelated components needs to go across the DOM. 

### Ligthning Messaging Service for Salesforce LWC
If we are doing LWC on Salesforce we can use the LMS (Ligthning Messaging Service). 

There are three steps first is to create a channel, then publish (who emmit the communication) and finally subscribe (who recibes that communication). Is an event bus pattern.

Read more in the [LMS Reference](https://developer.salesforce.com/docs/component-library/bundle/lightning-message-service)

### Pubsub Library
Before LMS the alternative was using the pubsub library. For LWC OSS we can try the [pubsub package](https://www.npmjs.com/package/pubsub-js)


## Resources
* [Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/Javascript/Building_Blocks/events)
* [Custom Events MDN](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)
* [Trailhead DX of LWC Communication Patterns](https://www.youtube.com/watch?v=kGKL1sIDIho)
* [Events Guide](https://lwc.dev/guide/events#configure-event-propagation)
* [Communication with Events](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.events)
* [Pluralsight](https://app.pluralsight.com/library/courses/communicate-between-salesforce-lightning-web-components/table-of-contents)
* [Trailhead](https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components?trail_id=build-lightning-web-components)

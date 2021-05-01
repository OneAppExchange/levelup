# Session 7: Wired Adapters

So far our components were more ui with local logic and no relation with any service running in a server. 
The goal of this session is to connect our components with services. 

We will introduce a new decorator, called @wired. The wired service provides an inmutable stream of data to the component. What this means ? That we have an elegant way to connect our components with Data Services. This Data Services doesn't know LWC.

One important thing is that wired services are reactive. Also important to notice that not always will execute a fetch service, and the stream will be provide from a cache instead.

The **Wired Adapter** is a module that implements the WireAdapter interface. This module will receive a configuration and a callback from the component. The module will provide the data calling the callback, and anytime the configuration is updated, will provision the new data with the callback function. 

We will use the $ in the configuration to tell that a field is reactive, this means that we will like to update the stream everytime that field changes. So if we are doing a query using a search condition to filter the results, we will used that as configuration, but also we will set that with $, so any time that condition changes our stream is updated.


**How is used in a component**
````
import { LightningElement } from 'lwc';
import { adapterId } from 'adapterModule';

export default class WireExample extends LightningElement {
    // We can Wired a Property 
    @wire(adapterId[, adapterConfig]) propertyName;

    // We can Wired a Method, notice that this method will receive always an object with data and error properties
    @wire(adapterId[, adapterConfig]) methodName( {data, error} ) {
    
    };
}
````

* **adapterId**: This is the adapterId that we imported from adapterModule. We will used apdater modules or we may need to create our own modules using the WireAdapter interface.
* **adapterConfig**: This is optional, and is the configuration that the adapterId will recieve to fetch the data. So in case we need to send parameters will be here as an object. { parameterName: value, parameterName: '$property' }. '$property' makes the reactivity, every time that property is updated
* **fieldOrFunction**: This can be a Field or a Function. 
  * **field**: In this case this **property** is private (remember that we can't used @api decorator if we used @wired). If the wired adapter was successfully, the result stream  will be set into a hardcoded field called data in the propperty, and if wasn't successully will set the error into a hardcoded error field inside the property.
  * **function**: This **method** also will be private, and will recieve the object with data or error, and we can code how to process that.

## Coding

### Create a Wired Adapter
In SF platform all the adapters are provided, and today we can't create our own adapters. But in LWC OSS we will need to create our apadters. 

Create a wired adapter requires a deeper understaning than consuming, so lets copy and paste one from [github](https://github.com/LWC-Essentials/wire-adapters/tree/master/packages/fetch/src/fetch),. This example will create an adapter that uses the fetch library to access web data from a url.


Let's go to src/modules/utils folder

````
mkdir fetch
mkdir -p fetch/__tests__
cd fetch
touch fetch.js
curl -O https://raw.githubusercontent.com/LWC-Essentials/wire-adapters/master/packages/fetch/src/fetch/usefetch.ts
curl -O https://raw.githubusercontent.com/LWC-Essentials/wire-adapters/master/packages/fetch/src/fetch/client.ts
cd __tests__
curl -O https://raw.githubusercontent.com/LWC-Essentials/wire-adapters/master/packages/fetch/src/fetch/__tests__/client.test.ts
````

Let's export both modules

fetch.js
````
export * from  './client';
export * from './usefetch';
````

Read more about this adapter [here](https://github.com/LWC-Essentials/wire-adapters/tree/master/packages/fetch)

### Use the Fetch Wired Adapter

Let's go to src/modules/ folder and create a couple of componets
````
mkdir books
mkdir -p books/list
mkdir -p books/list/__tests__
mkdir -p books/list/__stories__
touch books/list/list.html
touch books/list/list.js
touch books/list/list.css
````

list.html
````
<template>
    <div class="container">
        <div class="search">
            <lightning-input type="search" onchange={handleSearchKeyChange} label="Search Books" value={queryParams.q} ></lightning-input>
        </div>
        <template if:true={books.data}>
            <ul>
                <template for:each={books.data.items} for:item="book">
                    <li key={book.id} class="search-results">
                        {book.volumeInfo.title}
                    </li>
                </template>
            </ul>
            <div class="buttons">
                <lightning-button onclick={handlePreviousPage} label="Previous"></lightning-button>
                <lightning-button onclick={handleNextPage} label="Next"></lightning-button>
            </div>    

        </template>
        <template if:true={books.error}>
            <div>{error}></div>
        </template>
    </div>
</template>
````


list.js
````
import { useFetch, FetchClient, setFetchClient } from 'utils/fetch';
import { LightningElement, wire, track } from 'lwc';

export default class List extends LightningElement {

    constructor() {
        super();
        const fetchClient = new FetchClient('https://www.googleapis.com');
        setFetchClient(fetchClient);        
    }

    @track queryParams = { q: 'Harry Potter', startIndex: 0 }

    @wire(useFetch, {
        url: '/books/v1/volumes',
        queryParams: '$queryParams'
    }) books;

    handlePreviousPage() {
        const params = {... this.queryParams};
        if ( params.startIndex > 0 ) {
            params.startIndex--;
            this.queryParams = params;
        }
    }

    handleNextPage() {
        const params = {... this.queryParams};
        params.startIndex++;
        this.queryParams = params;
    }

    handleSearchKeyChange(event) {
        const params = {... this.queryParams};
        params.startIndex = 0;
        params.q = event.target.value;
        
        this.queryParams = params;
    }
}
````

list.css
````
.search-results {
    list-style: none;
}

ul {
    padding: 0;
}

li {
    margin: 0;
}

.margin-vertical-small {
    margin: 0 4 0 4;
}

a {
    text-decoration: var(--text-decoration);
    color: var(--color-text-link);
}
````

## See in action

If we want to see we will need to change our index.html and index.js

Let's replace the pricing-view for books-list

index.html
```
    <books-list ></books-list>
```

index.js
```
import MyBookList from  'books/list';

customElements.define('books-list', MyBookList.CustomElementConstructor);
```


## Reference
* [Wired Reference](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_wire_service_about)
* [Wired guide](https://lwc.dev/guide/wire_adapter)
* [Unit Test](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/unit_testing_using_wire_utility)
* [RFC](https://rfcs.lwc.dev/rfcs/lwc/0103-wire-adapters)
* [Blog Wired part 1: Consume Data](https://blog.riand.com/2020/01/lwc-wire-adapters-1-consuming-data.html)
* [Blog Wired part 2: Produced Streams](https://blog.riand.com/2020/01/lwc-wire-adapters-2-producing-data.html)

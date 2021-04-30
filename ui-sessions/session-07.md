# Session 7: Wired

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

````
````


## Reference
* [Wired Reference](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.data_wire_service_about)
* [Wired guide](https://lwc.dev/guide/wire_adapter)
* [Unit Test](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/unit_testing_using_wire_utility)
* [RFC](https://rfcs.lwc.dev/rfcs/lwc/0103-wire-adapters)
* [Blog Wired part 1: Consume Data](https://blog.riand.com/2020/01/lwc-wire-adapters-1-consuming-data.html)
* [Blog Wired part 2: Produced Streams](https://blog.riand.com/2020/01/lwc-wire-adapters-2-producing-data.html)

# Session 8: Error Handling

The goal of this session will be to explore how to process when something wasn't as expected, we will refresh some concepts and look at some best practices.

Let's explore different types of errors that may occur and how we can handle

## Try catch
Javascript has the try catch statement, the syntax is the following:
````
try {
  // this will be catch 
  let a = b * 2; // b is an undefined variable
  
  // This wont be catch because is a syntax error
  {{{
  
  // this wont be catch because is async
   setTimeout(function() {
     let a = b * 2; 
    }, 1000);   

} catch ( err ) { // err can be rename and is optional 

} finally { // is an elegant way to block code that will be excute after try/catch no matter if there was an expection or not

}
````

**Some considerations:**
* Only works for runtime errors: This means that if inside the try we have a syntax error, excecution will be stop and catch won't be excecuted
* Works synchronously: If we have an error in an async code inside the try, catch won't be excuted

**Good practices:**
* Avoid having a global try catch for all the code
* Catch the errors that you expected. Avoid cacthing errors that you dont expect, this only produces "silent" bugs that are very hard to find.
 

### Error Object
Javascript generates an Error object when an error occur with the following structure:
* name: like exception type
* message: the text that we are used to read in the console
* stack: sequence of calls

We can use the throw operator to fired our own errors. The syntax is the following:

````
  throw <Error Object>;
  // Javascript comes with Standard Error Objects like
  throw new SyntaxError('our message');
  throw new ReferenceError('our message');
  throw new TypeError('our message');
  throw new Error('our message');
````

### Throwing your own errors

Supposed that we have an record object represented in a json string. The record object has id as required field, and we want to put that our code

````
try {
  let record = JSON.parse(recordJson);
  if ( !record.id ) {
    throw new SyntaxError( 'Invalid record object, with id is required' ) ;
  }
} catch (err) {

}
````


### Rethrowing errors

We mentioned previously that a good practice is to catch only the errors that we are expecting. So how to do it in a single catch block.

````
try {
  let object = JSON.parse(json);
  

} catch (err) {
  if (err instanceof SyntaxError) {
  
  } else {
    throw err; // rethrow (*)
  }
}
````


### Custom Errors

We can create our own Error object extending the standard Error. In this example we are using inheritance, notice that we are receiveng the stack strace from node. Before creating custom errors read why is not recommended, mostly when we are creating libraries, is good to stand to standard errors, and we may add new properties to those objects ( [read more](https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.md) ).


````
class HttpError extends Error {
    constructor( status = 500, statusText, body, ...params) {
        super(...params)
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    }
}
````
To read more about try catch visit [Custom Errors](https://javascript.info/custom-errors)


### Global Catch


To read more about try catch visit [Error handling, "try...catch"](https://javascript.info/try-catch#optional-catch-binding)

## Asynchronic Errors


### Using try catch inside the callback function 

````
setTimeout(() => {
    try {
        //logic
    } catch (e) {
        //handle error
    }
}, 300)
````

### Wired
Here we have to handle errors comming from the provisioning using error, and errors processing data with a try catch statement.
````
@wire(getContactList)
wiredContacts({ error, data }) {
    if (data) {
        try {
            //logic to handle result
        } catch(e){
            //error when handling result
        }
    } else if (error) {
        //error with value provisioning
    }
}
````

### Promisses and imperative calls

Using promises we can use catch to handle errors in the async function as well in the then block.

````
getContactList()
    .then(result => {
        //logic to handle result... dont need a try catch
    })
    .catch(error => {
        //logic to handle errors
    });
````    

### Using async await with try catch


````
;(async function() {
    try {
        await getContactList()
        
        // logic to handle result
        
    } catch (err) {
        console.error(err) // we will make sense of that later
    }
})()

````

## Error Callback method

The Error Callback method captures errors from all the descendent components in its tree. 

Important things to see:
* It only catches errors in the handlers assigned via the template. Any programmatically assigned event handlers won’t be caught. 
* Once an error is caught, the framework unmounts the child component that threw the error from the DOM. 
* It catches errors that occurs in the descendant components but *not itself*.


## Display and Logging Errors

Good practices:
* Display error near the point of failure
* Toast for multiple errors or when a button is clicked 
* Low level components and utils throws errors that high level component will handle
* Create a Error display component that is reuse in the components
* Distinguish Operational and  Programmer Errors
> From the [Blog Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)
> Learn to distinguish between operational errors, which are anticipatable, unavoidable errors, even in correct programs (e.g., failing to connect to a server), and programmer errors, which are bugs in the program.
> Operational errors can and should be handled. Programmer errors cannot be handled or reliably recovered from (nor should they be), and attempting to do so makes them harder to debug.
> A given function should deliver operational errors either synchronously (with throw) or asynchronously (with a callback or event emitter), but not both. A user should be able to use try/catch or handle errors in the callback, but should never need both. In general, using throw and expecting a caller to use try/catch is pretty rare, since it’s not common in Node.js for synchronous functions to have operational errors. (The main exception are user input validation functions like JSON.parse.)
> When writing a new function, document clearly the arguments that your function expects, their types, any other constraints (e.g., “must be a valid IP address”), the operational errors that can legitimately happen (e.g., failure to resolve a hostname, failure to connect to a server, any server-side error), and how those errors are delivered to the caller (synchronously, using throw, or asynchronously, using a callback or event emitter).
> Missing or invalid arguments are programmer errors, and you should always throw when that happens. There may be gray area around what parameters the author decides are acceptable, but if you pass a function something other than what it’s documented to accept, that’s always a programmer error.
> When delivering errors, use the standard Error class and its standard properties. Add as much additional information as may be useful in separate properties. Where possible, use conventional property names (see below).




[Reduce errors](https://github.com/trailheadapps/lwc-recipes/blob/main/force-app/main/default/lwc/ldsUtils/ldsUtils.js)

## Logging Errors
In a development enviroment we can use console.error, that will show also the stack in the console. Console error accepts multiple arguments

````
console.error(obj1 [, obj2, ..., objN]);
console.error(msg [, subst1, ..., substN]);
````

In production console.error has no value, and we will need to use another mechanism to track this in a server and notify the dev team.

## Resources
* [Best Practices article](https://developer.salesforce.com/blogs/2020/08/error-handling-best-practices-for-lightning-web-components.html)
* [Node Error Handling best practices] (https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices) or [same content but nicer](https://www.bookstack.cn/read/goldbergyon-nodebestpractices-en/2.ErrorHandlingPractices.md)
* [Blog Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)

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

} finally { // is an elegant way to block code that will be excute after try/catch

}
````

**Some considerations:**
* Only works for runtime errors: This means that if inside the try we have a syntax error, excecution will be stop and catch won't be excecuted
* Works synchronously: If we have an error in an async code inside the try, catch won't be excuted

**Good practices:**
* Avoid having a global try catch for all the code
* Catch the errors that you expected. Avoid cacthing errors that you dont expect, this only produces "silent" bugs that are very hard to find.
* 

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


To read more about try catch visit [Custom Errors](https://javascript.info/custom-errors)





### Global Catch


To read more about try catch visit [Error handling, "try...catch"](https://javascript.info/try-catch#optional-catch-binding)
## Asynchronic Errors



## Error Callback


## Display and Logging Errors

## Resources
* [Best Practices article] (https://developer.salesforce.com/blogs/2020/08/error-handling-best-practices-for-lightning-web-components.html)



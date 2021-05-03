# Session 8: Error Handling

The goal of this session will be to explore how to process when something wasn't as expected, we will refresh some concepts and look at some best practices.

Let's explore different types of errors that may occur and how we can handle

## Try catch
Javscript has the try catch statement, the syntax is the following:
````
try {

} catch ( err ) {

} finally {

}
````

Some considerations:

* Only works for runtime errors: This means that if inside the try we have a syntax error, excecution will be stop and catch won't be excecuted
* Works synchronously: If we have an error in an async code inside the try, catch won't be excuted

Good practices:
* Avoid having a global try catch for all the code
* Catch the errors that you expected. Avoid cacthing errors that you dont expect, this only produces "silent" bugs that are very hard to find.
* 


## Asynchronic Errors


## Error Callback


## Resources
* [Best Practices article] (https://developer.salesforce.com/blogs/2020/08/error-handling-best-practices-for-lightning-web-components.html)



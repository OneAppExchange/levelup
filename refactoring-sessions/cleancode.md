
## Naminng
- Choose names thoughfully
- Choosing name to communicate your intent
- If you need to put a comment, then is a bad name
- Avoid disinformation. Make sure tha says what it means, and means what it says
- If you need to read the code, the is a bad name too
- Pronounceable names
- Avoid encodings (like Hungarian notation, dont need track types with new IDE)
- Choose parse of Speech well
  - Variable nouns
  - Methods verb names
  - If booleans make predicables, so if can read as a sentence
  - Variable names should be short is scope is small like one letter, but for variables with long scope should be lond
  - Function follows the opposite rule, should be short is have long scope (public api will be better like invoke), and should be long for small scope, so can be more descriptive
- Classes also, nice short names for public classes, and long names for private classes

## Functions 
- Need to be small
- Classes are hide in long functions
- Reduce Indent levels, ideally to one. Avoiding internal braces
- Well name and well name organized into well named classes and namespaces.
- Is performance impacted? call function is no longer an overhead, but in worst case we can look to inline functions in the lowest nesting loops
- Do One Thing: But mean one thing may be complicated. 
  - One way to see is that is doing the steps one level bellow the stated name of the function
  - Extract till drop discipline 
- Need to be only level of abstraction. 
  - This can also be complicated.
  - Mixing level of abstractions in a function is confusing


### Functions Structure
- Functions arguments, the fewer the better. No more than 3 rule. 
  - This also goes for constructors
  - If there is too much cohesion between arguments may be consider to send and object
- Avoid boolean arguments. The reason is that is we one flow for true and another for false, we can split in two functions
- Avoid null arguments, this is similar to the boolean, or worst because acts as boolean. I'm trusting my test and my team that is calling my function
  - Defensive programming is good for public api, where i dont control what I'm receiving
  - A good ofense is a good suit of test
- No output arguments, we expect that output is returning.
- Blocks and identings, if, else, whiles can call functions instead of using blocks, this will make more readable
- One Level of Abstraction per Function
- Stepdown Rule:
  - This rule moves to top of the class the public methods, and step down will go the first methods that will be call, after this the third and so on.
  - Helps the readability because the level of abstraction are order from top to bottom. 
  - Javascript tends to do the opposite for making easy the compilers work, but on the otherside we can do inner functions
  - With more than one public stepdown rule break the public first rule, because in the middle are the private child procedures of previous public
- Switch and cases statement, and blocks of if-else
  - There is concept called early and late bindings. Switch are example of early, are done at build time and any change in the decision will need a recompile 
  - If in module a we call a function o another module, we have a dependency. The switch fan out problem, explain that each new case opens to new dependencies.
  - With OO we have source dependencies and runtime dependencies. The source dependency direction with switch goes in the flow direction, but with Polymorphism we change the source dependecy direction. 
  - This inversion on dependency enable module a to depend on an interface, and plugin modules that module a doesnt know. We say that swithc impede independient deployability because flow and depenndecies goes in the same flow.

- Paradigms: 
  - Functional Programming
    - No vars assigments, functions change state
    - Temporal coupling, is when order of functions matters like open a file or database, process and finally close. Passing functions as arguments reduce thisside effect
    - CQS: separates changes states (commands changes states and returns nothign) from queries that arent changing the state. Commands has side effects but queries not
    - Getters and setters are the same, setters has side effects
    - This rule can also be read as if the function returns something is not changing state, and if returns nothing yes. This goes agais functions that do both like login that return a user, instead lets create a method getUser and throw expections in case is not susccessful.
    - Tell dont ask Rule: 
    - is the idea of send the command (tell), instead of asking outside the state in order to do the command.
    - This will reduced the queries
    - See feature envy code smell
    - Long chains of queries violates "the law of demeter", that says is a bad a idea that functions knwows too much of the whole system. Each function need to have limited amount of knowledge (reduce coupling)
    - Law of Demeter: 
    - you may call methods of objects that are pass as arguments, local vars, global vars
    - you may Not call methods of  objects returned from a previous method call.
    - Is so hard to follow that is called suggestion of Demeter. 
  - Structured Programming 
    - Algorithms are compositions of structures: if, loop and sequence of statenments.
    - early return in if doesnt violates
    - but break in loops are indirect exit conditions, doesnt violate structure but makes loop more complicated 
    - a rule for readness is avoid break and return in loops
    - so simple loop to find, do we need to really complicate it, always keep in mind readability, that is the goal, so if exception is clear in a very simple itereation do it. 
  
  - Exceptions: 
    - Michael Feathers wrote Error Handling is important but if obscure logic is wrong
    - Unchecked are better than Checked Exceptions, avoid this, always extend from runtime exception
    - Better to create exception and scope in the classes rather than resuing standard
    - Good expcection names avoid adding additional text messages
    - try block must be the first and need to be a single line (a function)
    - error handling is one thing, so a function do something or handle errors, but not both
    - Better exceptions over error codes 
    - Using null value (find example), null is not a value.
      - Dont return null. Example of list, is better returning an empty list
      - Dont pass null, unless is an api that expects null
  
## Forms
  - Comments:
    -  We follow a coding standard, but better if the code is showing that standard rather than reading a documentation about it
    -  Over comments, make us to avoid reading it, even the important ones.
    -  If comments should be rear, to say to developers pay special attention here
    -  A way of looking is that every comment is a failure of expressing intention with the code
    -  Comments can be miscommunication, because they are not updated
    -  Bad comments
       -  redundant explanations
       -  not write for you
       -  use git to changelog instead of comments, or authoring too
       -  possition markers or big banner comments
       -  close bracing comments } // for, no need anymore!
       -  comment for another place
    -  Formatting matters
       -  space or tabs. 2 or 4. Important to define as team and follow it.
       -  max length line 40 to 120, avoid scroll right
       -  max files length also around 100 but never  more than 500
  - OO Programming
    -  Classes vs Data structure
       -  classes public methods, while variables try to remind hidden
          -  hide implementation, in classes we try to minimize getters and setters, and if we have we try to do abstract from implementation (example of fuel and amountOfGas in Car class)
          -  we want cohesive methods (the more vars uses the more cohesive will be)
          -  adding a new method on base class need to recompile all the derivates, breaking independent deployability
       -  Datastructures
          - has public variables and no cohesive methods, can have getter and setters. 
          - dont abstract the internal implementations
          - tends to use a switch statements instead polymorphism
          - addign new methods doesnt need to recompile everything, but a new switch
     - For Independent Deployability we use this rukle, when methods are mostly to been add we use datastructure, and when types are mostly to been added
  Boundaries
    - When we have layers there is boundary, we have on one side an abstract side and a concrete side. The concrete side depends on the abstract. 
    - Databases are concrete data structures, pure fields without methods. This is another example of how control flow direction is different to dependency. This is also align with DDD, where domain doesnt depend on the database
    - Concrete side, has switchs.
    - View also is concrete, and point towards to Domain (Application)
    - Dependency inversion Principle


## TDD
- The only way to do cleanup safely is to have good test suit, and the purpouse of TDD is eliminate the fear of change code
- Elimiate the fear of change, or improve it, make the system scalable and better instead of making rot overtime
- Reduce Debug time 
- Cleanup example
- Three rules of TDD
  - Write no production code except to pass a failing test
  - Write only enought of a test to demostrate a failure
  - Write only enought production code to past the test
- Red => Greem => Refactor
- Test cases are code samples for our application. 
- Writing test first makes the production code testeable, and the only wat is decoupling the code 
- Writing test last, not only is borring, also you may not be sure you did it all 
- Test classes are also code, not second class citizen, need refactoring too, avoid duplicates for example. Are important as production code
- Test test production, and production code test the Test, like double accountin
- If test is a mess is bad design, if a simple change break a lot, something is wrong is very couple to the code
- TDD is a personal practice.
- TDD as other creative works need iteration and refinements.
- Disciplines
  - are good to follow so you no need to think in some special ocacions like CPR
  - but this doesnt mean that we can periodically review this rules
  
Kata for Bowling Game
  
# Introduction

After taking the course Refactoring for Testability series of classes offered by TPIL, we are introduce in what is Refactoring and how we can with small processes convert our code in something more clean and human redable.



## Refactor Fridays
The goal of the course is to implement in each time a weekly session like pair programming where the team can do refactoring together. 

For more information see the quip: https://salesforce.quip.com/qIbDAHbMDqB8


## Additional Material

Martin Fowler has a book for Refactoring, and his lastest edition was on Javascript, we will take examples from this book. 

A good site to visit is https://refactoring.guru/es/refactoring



## What is Refactoring ? 

Refactoring is a process where we will change the code with out changing the behaviour. There are many reason why we can do this, one could be performance, make code smaller, make code more easier to read and mantain. The last one, make code more human redable, is equivalent to Good Code definition.
Is a set of small procedures and techniques that we can do in our code to make it more readable. Is a use case of code restructuring, that is very fast and low risk. We don't spend days refactoring, we invest hours in make our code more readable and easy to change.

## Two hats

When we start doing refactoring, the first question is if was doing wrong, and the way to answer is that even excellent code needs refactoring. 
Is important to notice that even after learning all the patterns and rules, there are different times in the process of building code. 
Edward De Bono use to talk about hats, for describing the mindset that we need to do based on the type of activity that we are doing. 
Following that we talked about the two hats, one that we will use when we are adding new behaviours to our code and test, and another that is the rafactor hat, that we will wear after to change the code, but without adding new functionallity.

### Why 

Building software is not a onetime processes, the code is like organism, that will grow and evolve over the time. So this means that I know only the current requirements, even if i try to guess future needs, I may over design and code Yagni things. On the other hand is a fact that tomorrow, somebody will need to read and add new requirements to the existing code. 

Over the time we want to keep the code easy to read and to change, because somebody --even us-- will need to read that code in the future. Today we cached in our brains a lot of things that tomorrow we will like to refresh just by fast reading. 

There are some arguments for refactoring, 
- improves the design of the software
- one pure economic is that if is more readable is easier to add new features
- If is more maintaable is easier to bugfix.
- helps to program faster

### When (Culture)
"Refactoring is like taking a shower" Kent Beck.  It works best and cost less if you do it regularly. 

"First make the change easy, then make the easy change"  Kent Beck

**Opportunistic:**
When we are adding new functionality, is a good time to check how easy or complex is reading the code.  Also when we finished adding code, we can ask ourselves again. Here we talked about the "Boy scout" attitude, before leaving check that is equal or cleaner. 

- Preparatory Refactoring: Can be done when starting a new task, example of going trought the woods or going nort first and take the highway
  https://martinfowler.com/articles/preparatory-refactoring-example.html

- Comprehension Refactoring: Making Code Easier to Understand: Before I can change some code, I need to understand what it does. This code may have been written by me or by someone else.

-  Litter-Pickup Refactoring: A variation of comprehension refactoring is when I understand what the code is doing, but realize that it’s doing it badly.

**Planned:** 
Most refactoring must be opportunistic, but sometimes we may neglected refactoring for many reasons like lack of time or resources (accumulating technical debt)

Doing TDD we can incorporate the Red, Green, Refactor cycle.

### When not do refactoring:
- Spike code
- Code that is going to be retired
- Code with strict Performance requirements
- When is easier to rewrite
- Ugly code that can be treat as an api

### Preconditions

Before doing a refactoring, we need to be sure that we have test cases that validates the expected behaviour of our code. If we dont have that we can't start. In case we dont have one or more behaviours in our test, we need to code it and be sure that all test passed before doing any refactor operation.


## What (Skills)

### Code Smells
The term code smells, is used to those codes that suggest something is bad. But this approach needs some experience to get that feeling and sometimes may be more subjective.

### Rules
Another approach is following some strict rules, that is not perfect, but is good until we get the musle and experience. Like a code cant have more than 5 lines of code.


### Refactor Pyramid
Refactor pyramid aligns with testing pyramid. Saying at the bottom we refactor Flows, then Methods, Classes, Patterns and finaly Architecture



## How (tools)



## Localizing Invariants



## Sessions

### 1. [Session 01: Breaking up Functions](session-01:%20breaking%20up%20functions.md)
### 2. [Session 02: Make Types Work](session-02:%20make%20types%20works.md))
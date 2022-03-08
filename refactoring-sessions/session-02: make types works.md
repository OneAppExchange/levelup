

## Rule Never use if with else

- Statement: Never use else with if unless we are checking data we dont control
- Explanation: if are checks, while if - else are decisions, and we see this like hardcoded decisions.
- Smell: Early bindings, this decisions cant be change without recompiling. The oppposite late bindings, decisions are resolve when the code is run. Prevents change by addition
- Intent: OOP has stronger control flows operators, the objects. So rule forces to look for objects
- Refactor Pattern: Replace type code with classes 


Example:

````
function average(ar: number[]) {
  if (size(ar) === 0)
    throw "Empty array not allowed";
  else
    return sum(ar) / size(ar);
}
````

Now we will use two patterns to move from the if-else to a late binding using classes

### Pattern Replace type code with classes 

This pattern transforms enum as interfaces and enum values into classes. This enables adding properties to a value, localizing functionallity and enables changes by addition (in collaboration with another pattern push code into classes).

So, notice that adding a new value to enum, will be goto the enum and after to each if-else or switch condition, while creating a new class with an interface we dont need to goto every code.

Sometimes we have group of constants instead on enums. In this case we need to transform first the constants into enum


([https://refactoring.com/catalog/replaceTypeCodeWithSubclasses.html](Martin Fowlers) )

Example
````
enum TrafficLight {
  RED, YELLOW, GREEN
}
const CYCLE = [TrafficLight.RED, TrafficLight.GREEN, TrafficLight.YELLOW];

function updateCarForLight(current: TrafficLight) {
  if (current === TrafficLight.RED)
    car.stop();
  else
    car.drive();
}
````


### Pushing code into Classes 

Now we want to move this function as a method for each new classes

````
  handleInput(input) {              
    if (input.isLeft())         
      moveHorizontal(-1);
    else if (input.isRight())   
      moveHorizontal(1);
    else if (input.isUp())      
      moveVertical(-1);
    else if (input.isDown())    
      moveVertical(1);
  }
}
````

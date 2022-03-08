# Introduction

Let's see our first code. We have a list of Plays in a json ([view file](samples/extract_function/play.json)), with a name and type. And we have invoices where we have per customer the play performances ([view file](samples/extract_function/invoices.json)). 

We have a piece of code that recives this two variables and will output the billing information. [view file](samples/extract_function/statement.ts)

Robert Martin says that long functions are the place where classes hides. If we see the landscape of a function we can see local variables that are shared by different sections of the function, we use to add spaces, so is easy to visualized, this may be potential methods and the vars properties.



## Precondition


## Rule 5 lines of code
Indentify long Method or Functions.

**Statement**
A method should not contain more than five lines, excluding { and }.

**Smell**
Having long methods is a smell in itself. Methods should do one thing

**Intent**
Left unchecked, methods tend to grow over time as we add more and more functionality to them. This makes them increasingly difficult to understand. Imposing a size limit on our methods prevents us from sliding into this bad territory.



`````
function draw() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");
 
  g.clearRect(0, 0, canvas.width, canvas.height);
 
  // Draw map                                
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === Tile.FLUX)
        g.fillStyle = "#ccffcc";
      else if (map[y][x] === Tile.UNBREAKABLE)
        g.fillStyle = "#999999";
      else if (map[y][x] === Tile.STONE || map[y][x] === Tile.FALLING_STONE)
        g.fillStyle = "#0000cc";
      else if (map[y][x] === Tile.BOX || map[y][x] === Tile.FALLING_BOX)
        g.fillStyle = "#8b4513";
      else if (map[y][x] === Tile.KEY1 || map[y][x] === Tile.LOCK1)
        g.fillStyle = "#ffcc00";
      else if (map[y][x] === Tile.KEY2 || map[y][x] === Tile.LOCK2)
        g.fillStyle = "#00ccff";
 
      if (map[y][x] !== Tile.AIR && map[y][x] !== Tile.PLAYER)
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
 
  // Draw player                          
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}
`````

`````
function minimum(arr: number[][]) {
  let result = Number.POSITIVE_INFINITY;
  for (let x = 0; x < arr.length; x++)
    for (let y = 0; y < arr[x].length; y++)
 
      if (result > arr[x][y])   ❶
        result = arr[x][y];     ❶
 
  return result;
}
`````
- Combine with common subexpressions pattern
- Perform inline local variable
  

## Rule: Either call or pass 
Breaking up functions to balancing abstraction

**Statement**
A function should either call methods on an object or pass the object as an argument, but not both.


````
function average(arr: number[]) {
  return sum(arr) / arr.length;
}
````

## Rule: if only at the start

- **Statement**: If you have an if, it should be the first thing in the function. Supporting the function must be only one thing, if the function have on, must be the first thing.
- **Smell**: Methods should do one thing
- **Intent**:  Extract if with all the else and else if to do just that
- **Refactor**: We use Extract Method.

**Example**
````
function reportPrimes(n: number) {
  for (let i = 2; i < n; i++)
    if (isPrime(i))
      console.log(`${i} is prime`);
}
````


## Refactor Pattern: Extract Method
Extract part of a method into another. We can do it manually or using IDE.

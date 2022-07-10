const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf-8')
const assert = require('assert')

const example = `
0
3
0
1
-3`

// This one should be fun :)
// just make a for loop that messes with its input as well as changes the i on the forloop inside of the forloop, i being corolational to what part of the array you're on
// also, keep track of steps (each itteration of the forLoop will have a steps+=1 at the start)

// so the number you land on is how many you move i forwards or backwards (but before the end of the loop you need to change that number)

function parse (list) {
  return list
    .trim()
    .split('\n')
    .map(Number)
}

function goThrough (list) {
  const route = parse(list)
  let position = 0
  let steps = 0

  while (position < route.length) {
    steps += 1
    let curInst = route[position]
    route[position] += 1
    position += curInst
    // console.log(route)
  }
  return steps
}

assert.strictEqual(goThrough(example), 5)
assert.strictEqual(goThrough(data), 342669)

function goThroughTwo (list) {
  const route = parse(list)
  let position = 0
  let steps = 0

  while (position < route.length) {
    steps += 1
    let curInst = route[position]
    if (route[position] >= 3) {
      route[position] -= 1
    } else {
      route[position] += 1
    }
    position += curInst
    // console.log(route)
  }
  return steps
}

assert.strictEqual(goThroughTwo(example), 10)
assert.strictEqual(goThroughTwo(data), 5)

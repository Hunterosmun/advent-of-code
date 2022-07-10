const fs = require('fs')
const path = require('path')
const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
const assert = require('assert')

const example = `16,1,2,0,4,2,7,1,2,14`

//
// Need to go over a list of things, and see what number is the least changes to move all of the numbers to
// (IE: if I had 1,2,2,2,7 -> It would probs be the least change to move everything to 2)
//

function parse (list) {
  return list.split(',').map(Number)
} // works //

function checkLoc (list) {
  const crabs = parse(list)
  let finalFuel = null
  for (const crab of crabs) {
    let fuel = 0
    for (const part of crabs) {
      const dif = Math.abs(crab - part)
      fuel += dif
    }
    if (finalFuel === null) finalFuel = fuel
    if (fuel < finalFuel) finalFuel = fuel
  }
  return finalFuel
}

assert.strictEqual(checkLoc(example), 37)
assert.strictEqual(checkLoc(data), 364898)

//
// Now each movement isn't one fuel, but 1 fuel more than the move before (starting at 1)
// (so the moves are 1, then 2, then 3, then 4 fuel, etc)
//
// 1 becomes 1, 2 becomes 3, 3 becomes 5, 4 becomes 9

function checkLocTwo (list) {
  const crabs = parse(list)

  const { max, min } = findMaxMin(crabs)

  let finalFuel = null
  for (let j = min; j < max; j++) {
    let fuel = 0
    for (const crab of crabs) {
      let dif = Math.abs(j - crab)
      let tracker = 0
      for (let i = 1; i < dif + 1; i++) {
        tracker += i
      }
      fuel += tracker
    }
    if (finalFuel === null) finalFuel = fuel
    if (fuel < finalFuel) finalFuel = fuel
  }
  return finalFuel
}

function findMaxMin (list) {
  list.sort()
  return { min: list[0], max: list[list.length - 1] }
}

assert.strictEqual(checkLocTwo(example), 168)
assert.strictEqual(checkLocTwo(data), 104149091)

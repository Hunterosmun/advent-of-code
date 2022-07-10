const fs = require('fs')
const path = require('path')
const santasList = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
const assert = require('assert')

// Lanternfish propogate Exponentially (need to model this growth rate out)
// A fish has a new fish every 7
// Rate at which they propogate isn't equal. Some have dif numbers of days left before babies
// When a fish is born it needs 7 + 2 days till it propogates
// scale of days goes from 0-6 (so new ones start at 8)
// 0 --> 6, adds one w/8

// Need to check after 80 days

const example = `3,4,3,1,2`

function parse (list) {
  return list.split(',').map(Number)
}

function makeFish (list) {
  const startFish = parse(list)

  const fish = []
  for (let fishy of startFish) {
    fish.push({
      tillBaby: fishy
    })
  }
  return fish
}

function time (list, day) {
  const fish = makeFish(list)
  //need to loop over the fish X days (80) and change each one's tillBaby.
  // then loop over and see how many are less than 0, for each reset their time and set a new baby
  let days = day
  for (let i = 0; i < days; i++) {
    // ticken down for one day
    for (each of fish) {
      each.tillBaby -= 1
    }
    // check what'll have babies
    for (each of fish) {
      if (each.tillBaby < 0) {
        each.tillBaby = 6
        // add the baby!
        fish.push({ tillBaby: 8 })
      }
    }
  }
  return fish.length
}

//
// a more effecient makeFish
function effecientMakeFish (list) {
  const startFish = parse(list)
  const fish = new Array(9).fill(0)
  // at this point fish w/ babies has been initialized
  for (let num of startFish) {
    fish[num] += 1
  }
  return fish
}

function effecientTime (list, day) {
  const fish = effecientMakeFish(list)
  //need to loop over the fish X days (80) and change each one's tillBaby.
  // then loop over and see how many are less than 0, for each reset their time and set a new baby
  for (let i = 0; i < day; i++) {
    // ticken down for one day
    let moms = fish[0]
    for (let j = 0; j < fish.length; j++) {
      fish[j] = fish[j + 1]
    }
    fish[8] = moms
    fish[6] += moms
  }
  // let total = 0
  // for (let i = 0; i < 9; i++) {
  //   total += fish[i]
  // }
  // return total
  return fish.reduce((acc, el) => acc + el)
}

assert.strictEqual(effecientTime(example, 256), 26984457539)
assert.strictEqual(effecientTime(santasList, 256), 1595330616005)

assert.strictEqual(time(example, 80), 5934)
assert.strictEqual(time(santasList, 80), 351092)
// turns out using my old functions for 256 day increments overloads like crazy....
// so make sure you store things effeciently Hunter!

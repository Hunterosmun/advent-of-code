const assert = require('assert')
const fs = require('fs')
const path = require('path')
const { cursorTo } = require('readline')
const santasList = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')

const example = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`

// Octopi have an energy level of 0-9, when they reach 9 they flash and activate everyone around them, raising their level by 1
// 3 step process:
// 1: all octopi energy +=1
// 2: if (octopus energy >= 9) ocotopus flashes (all around +=1)
// 3: if (ocotpus === flashed) energy = 0

function parse (list) {
  return list
    .trim()
    .split('\n')
    .flatMap(el => el.split(''))
    .map(Number)
}

function flash (arr, steps, flashes) {
  let octs = arr
  // step 1: Add 1 energy to all octopuses!
  octs = octs.map(oc => (oc += 1))
  // step 2: Check for flashes!
  octs = octs.map((oct, i) => {
    // Check if it's 9 or above, then flash it but don't let it affect 0? (all 0's will be 1's from step 1)
    if (oct > 9) {
      flashes += 1
      // will I need a ton of cases for if the thing is on the border or corner? hmmm
      // If I do this instead as a flat-mapped array, I could just add or subtract 10 to the index to get to above or below the thing?
      if (octs[i - 1] && i + (1 % 10) !== 1) octs[i - 1] += 1 /// problem here.
      if (octs[i - 9]) octs[i - 9] += 1
      if (octs[i - 10]) octs[i - 10] += 1
      if (octs[i - 11]) octs[i - 11] += 1
      if (octs[i + 1] && i + (1 % 10) !== 1) octs[i + 1] += 1
      if (octs[i + 9]) octs[i + 9] += 1
      if (octs[i + 10]) octs[i + 10] += 1
      if (octs[i + 11]) octs[i + 11] += 1
      oct = 0
    }
    return oct
  })
  steps -= 1
  return { octs, steps, flashes }
}

function main (list, steps) {
  let octs = parse(list)
  let numOfFlashes = 0
  // definitely need to change this from a for loop.
  for (let i = 0; i < steps; i++) {
    // console.log(steps)
    // let { one, two, three } = flash(octs, steps, numOfFlashes)

    // octs = one
    // steps = two
    // numOfFlashes = three

    // step 1: Add 1 energy to all octopuses!
    octs = octs.map(oc => (oc += 1))
    // step 2: Check for flashes!
    let nines
    do {
      nines = octs.reduce((acc, el, i) => (el > 9 ? [...acc, i] : acc), [])

      numOfFlashes += nines.length

      octs = nines.reduce((octs, i) => {
        if (octs[i - 10]) octs[i - 10] += 1
        if (octs[i + 10]) octs[i + 10] += 1

        // Moving Left
        if (octs[i - 1] && i % 10 !== 0) octs[i - 1] += 1
        if (octs[i - 11] && i % 10 !== 0) octs[i - 11] += 1
        if (octs[i + 9] && i % 10 !== 0) octs[i + 9] += 1

        // Moving Right
        if (octs[i + 1] && i % 10 !== 9) octs[i + 1] += 1
        if (octs[i + 11] && i % 10 !== 9) octs[i + 11] += 1
        if (octs[i - 9] && i % 10 !== 9) octs[i - 9] += 1

        octs[i] = 0
        return octs
      }, octs)
    } while (nines.length > 0)
  }

  return numOfFlashes
}

assert.strictEqual(main(example, 10), 204)
assert.strictEqual(main(example, 100), 1656)
assert.strictEqual(main(santasList, 100), 1673)

// const arr = ['one', 'two', 'three']

// arr.map((el, i) => {
//   console.log('---------')
//   if (arr[i - 1]) console.log(arr[i - 1])
//   if (arr[i + 1]) console.log(arr[i + 1])
// })

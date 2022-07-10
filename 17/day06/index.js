const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf-8')
const assert = require('assert')

const example = `
0 2 7  0`
//
// Need to find how many iterations we go through before we find a similar pattern
// So each block holds so many things, and will give them evenly to others
// We need to:

// Make the sections (parse & make an object that has memory number)
function parse (input) {
  const thing = input
    .trim()
    .split(/\s+/)
    .map(Number)
  // const banks = {}
  // for (let i = 0; i < thing.length; i++) {
  //   banks[`${i}`] = thing[i]
  // }
  // return banks
  return thing.reduce((acc, el, i) => {
    acc[`${i}`] = el
    return acc
  }, {})
}

function arrange (input, part2 = false) {
  const list = parse(input)
  const objLength = Object.keys(list).length
  // here we set the count for how many steps it took before it repeated
  let steps = 0
  const itts = [] // itts = itterations
  let repeats = null

  while (true) {
    //When done with the loop (and to start with), need to take the numbers given and add them into a string and push that string
    let stringed = ''
    for (let i = 0; i < objLength; i++) {
      stringed = stringed.concat(`${list[i]}`, ' ')
    }
    if (part2 === false) {
      if (itts.includes(stringed)) {
        break
      }
    } else {
      if (stringed === repeats) {
        break
      }
      if (itts.includes(stringed)) {
        if (repeats === null) {
          repeats = stringed
          steps = 0
        }
      }
    }
    itts.push(stringed)

    steps += 1

    // Here we find what object has the highest num
    let index = null
    let highest = null
    for (let i = 0; i < objLength; i++) {
      if (index === null) index = i
      if (highest === null) highest = list[i]
      if (list[i] > highest) {
        highest = list[i]
        index = i
      }
    }

    // take num to new obj, set num at that index to 0, loop through from there forward to add number taken
    let holder = list[index]
    list[index] = 0
    for (let i = 0; i < holder; i++) {
      index = (index + 1) % objLength
      list[index] += 1
    }
  }
  return steps
}

assert.strictEqual(arrange(example), 5)
assert.strictEqual(arrange(data), 3156)

assert.strictEqual(arrange(example, true), 4)
assert.strictEqual(arrange(data, true), 1610)

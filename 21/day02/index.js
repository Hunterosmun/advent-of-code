const fs = require('fs')
const input = fs.readFileSync('day2-input.txt', 'utf-8')
const assert = require('assert')

//We need to figure directions from a list
//option then number
//forward -> increase horizontal direction
//down -> increases depth
//up -> decreases depth

const reg = /^(forward|down|up) (\d+)$/

const test = `
forward 5
down 5
forward 8
up 3
down 8
forward 2`

function parse (list) {
  return list
    .trim()
    .split('\n')
    .map(instruction => {
      const [, direction, num] = instruction.match(reg)
      return { direction, num: Number(num) } //could also just put +num
    })
}

// This was my first code, it worked great but Dallin helped me optimize! :)
// function findValOne (list) {
//   const instructions = parse(list)

//   let horiz = 0
//   let depth = 0
//   instructions.forEach(instruction => {
//     if (instruction.direction === 'forward') {
//       horiz += instruction.num
//     }
//     if (instruction.direction === 'down') {
//       depth += instruction.num
//     }
//     if (instruction.direction === 'up') {
//       depth -= instruction.num
//     }
//   })
//   return { horizon: horiz, depth, direction: horiz * depth }
// }
// assert.strictEqual(findValOne(input).direction, 2070300)
// assert.strictEqual(findValOne(test).direction, 150)

function findValOne (list) {
  const { horizon, depth } = parse(list).reduce(
    (acc, el) => {
      if (el.direction === 'forward') {
        acc.horizon += el.num
      }
      if (el.direction === 'down') {
        acc.depth += el.num
      }
      if (el.direction === 'up') {
        acc.depth -= el.num
      }
      return acc
    },
    { horizon: 0, depth: 0 }
  )
  return horizon * depth
}

// (These are the same, but .strictEqual will tell you what it got)
assert.strictEqual(findValOne(test), 150)
assert(findValOne(test) === 150)

// my code before reduce
// function findValTwo (list) {
//   const instructions = parse(list)

//   let horiz = 0
//   let depth = 0
//   let aim = 0
//   instructions.forEach(instruction => {
//     if (instruction.direction === 'forward') {
//       horiz += instruction.num
//       depth += aim * instruction.num
//     }
//     if (instruction.direction === 'down') {
//       aim += instruction.num
//     }
//     if (instruction.direction === 'up') {
//       aim -= instruction.num
//     }
//   })
//   return { horizon: horiz, depth, direction: horiz * depth }
// }

// assert.strictEqual(findValTwo(test).direction, 900)
// assert.strictEqual(findValTwo(input).direction, 2078985210)

function findValTwo (list) {
  const { horizon, depth } = parse(list).reduce(
    (acc, el) => {
      if (el.direction === 'forward') {
        acc.horizon += el.num
        acc.depth += acc.aim * el.num
      }
      if (el.direction === 'down') {
        acc.aim += el.num
      }
      if (el.direction === 'up') {
        acc.aim -= el.num
      }
      return acc
    },
    { horizon: 0, depth: 0, aim: 0 }
  )
  return horizon * depth
}

assert.strictEqual(findValTwo(test), 900)
assert.strictEqual(findValTwo(input), 2078985210)

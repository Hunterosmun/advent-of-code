const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/spoof2.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`

function main(input) {
  // const regex = /mul\((\d+),(\d+)\)/g
  // stuff here
  return input
    .trim()
    .split('\n')
    .reduce((acc, el) => {
      const [num1, num2] = el.split(',').map(Number)
      console.log({ acc, num1, num2 })
      return acc + num1 * num2
    }, 0)
}

// assert.strictEqual(main(ex1), 161)
assert.strictEqual(main(santasList), 166630675)

function partTwo(input) {
  // stuff here
}

// assert.strictEqual(partTwo(ex1), 'answer')
assert.strictEqual(partTwo(santasList), 93465710)

function helper(input) {
  // stuff here
}

function spoof(input) {
  return input
    .trim()
    .split('\n')
    .reduce((acc, el) => {
      const [num1, num2] = el.split(',').map(Number)
      console.log({ acc, num1, num2 })
      return acc + num1 * num2
    }, 0)
}

const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`

function main (input) {
  return makeList(input).reduce((acc, step) => {
    if (
      (step.one.start <= step.two.start && step.one.end >= step.two.end) ||
      (step.two.start <= step.one.start && step.two.end >= step.one.end)
    ) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
}

assert.strictEqual(main(ex1), 2)
assert.strictEqual(main(santasList), 509)

function partTwo (input) {
  return makeList(input).reduce((acc, step) => {
    if (step.one.end < step.two.start || step.one.start > step.two.end) {
      return acc
    } else {
      return acc + 1
    }
  }, 0)
}

assert.strictEqual(partTwo(ex1), 4)
assert.strictEqual(partTwo(santasList), 870)

function makeList (input) {
  return input
    .trim()
    .split('\n')
    .map(s => {
      const partial = s.split(',')
      const personOne = partial[0].split('-')
      const personTwo = partial[1].split('-')
      return {
        one: { start: +personOne[0], end: +personOne[1] },
        two: { start: +personTwo[0], end: +personTwo[1] }
      }
    })
}

const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

function main (input) {
  return elfTotals(input).pop()
}

assert.strictEqual(main(ex1), 24000)
assert.strictEqual(main(santasList), 71780)

function partTwo (input) {
  return elfTotals(input)
    .splice(-3)
    .reduce((el, itt) => el + itt, 0)
}

assert.strictEqual(partTwo(ex1), 45000)
assert.strictEqual(partTwo(santasList), 212489)

function elfTotals (input) {
  return input
    .trim()
    .split('\n\n')
    .map(el =>
      el
        .trim()
        .split('\n')
        .map(e => +e)
        .reduce((e, i) => i + e, 0)
    )
    .sort((a, b) => a - b)
}

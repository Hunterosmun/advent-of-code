const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

function main(input) {
  return elfTotals(input).pop()
}

assert.strictEqual(main(ex1), 142)
assert.strictEqual(main(santasList), 0)

// function partTwo (input) {
//   return elfTotals(input)
//     .splice(-3)
//     .reduce((el, itt) => el + itt, 0)
// }

// assert.strictEqual(partTwo(ex1), 45000)
// assert.strictEqual(partTwo(santasList), 212489)

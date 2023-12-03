const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
Stuff here
`

function main (input) {
  // stuff here
}

assert.strictEqual(main(ex1), 'answer')
assert.strictEqual(main(santasList), 'answer')

function partTwo (input) {
  // stuff here
}

assert.strictEqual(partTwo(ex1), 'answer')
assert.strictEqual(partTwo(santasList), 'answer')

function helper (input) {
  // stuff here
}

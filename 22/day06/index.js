const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`
const ex2 = `
bvwbjplbgvbhsrlpgdmjqwftvncz
`
const ex3 = `
nppdvjthqldpwncqszvftbrmjlhg
`
const ex4 = `
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
`
const ex5 = `
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`

function main (input) {
  const processed = input.trim().split('')
  for (let i = 0; i < processed.length; i++) {
    if (
      processed[i] !== processed[i + 1] &&
      processed[i] !== processed[i + 2] &&
      processed[i] !== processed[i + 3] &&
      processed[i + 1] !== processed[i + 2] &&
      processed[i + 1] !== processed[i + 3] &&
      processed[i + 2] !== processed[i + 3]
    ) {
      return i + 4
    }
  }
}

assert.strictEqual(main(ex1), 7)
assert.strictEqual(main(ex2), 5)
assert.strictEqual(main(ex3), 6)
assert.strictEqual(main(ex4), 10)
assert.strictEqual(main(ex5), 11)
assert.strictEqual(main(santasList), 1651)

function partTwo (input) {
  const processed = input.trim().split('')
  for (let i = 0; i < processed.length; i++) {
    const thisChunk = processed.slice(i, i + 14)
    const filteredChunk = thisChunk.filter(
      (val, i, arr) => arr.indexOf(val) === i
    )
    if (thisChunk.length === filteredChunk.length) return i + 14
  }
}

assert.strictEqual(partTwo(ex1), 19)
assert.strictEqual(partTwo(ex2), 23)
assert.strictEqual(partTwo(ex3), 23)
assert.strictEqual(partTwo(ex4), 29)
assert.strictEqual(partTwo(ex5), 26)
assert.strictEqual(partTwo(santasList), 3837)

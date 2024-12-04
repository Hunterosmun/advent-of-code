const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`

function main(input) {
  let total = 0
  input
    .trim()
    .split('\n')
    .forEach((row) => {
      const nums = row.split(' ').map((n) => +n)
      if (!isReportIsUnsafe(nums)) total++
    })
  return total
}

assert.strictEqual(main(ex1), 2)
assert.strictEqual(main(santasList), 230)

function partTwo(input) {
  let total = 0
  input
    .trim()
    .split('\n')
    .forEach((row) => {
      const nums = row.split(' ').map((n) => +n)
      if (!isReportIsUnsafe(nums)) {
        total++
        return
      } else {
        let someLevelWorked = false
        // console.log({ ORIGINAL: nums })
        nums.forEach((j, k) => {
          if (someLevelWorked) return
          const newNums = nums.filter((n, i) => i !== k)
          if (!isReportIsUnsafe(newNums)) {
            someLevelWorked = true
            total++
          }
        })
      }
    })
  return total
}

assert.strictEqual(partTwo(ex1), 4)
assert.strictEqual(partTwo(santasList), 301)

function isReportIsUnsafe(input) {
  let direction
  let isUnsafe = false
  input.forEach((n, i) => {
    if (i === 0 || isUnsafe) return
    const numBefore = input[i - 1]
    if (!direction) direction = n > numBefore ? 'asc' : 'desc'
    if (n == numBefore) isUnsafe = true
    const diff = direction === 'asc' ? n - numBefore : numBefore - n
    if (diff > 3 || diff < 0) isUnsafe = true
  })
  return isUnsafe
}

const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
3   4
4   3
2   5
1   3
3   9
3   3
`

function main(input) {
  const twoLists = getTwoLists(input)

  twoLists.list1 = twoLists.list1.sort((a, b) => a - b)
  twoLists.list2 = twoLists.list2.sort((a, b) => a - b)

  return twoLists.list1.reduce((acc, n, i) => {
    return (acc += Math.abs(n - twoLists.list2[i]))
  }, 0)
}

assert.strictEqual(main(ex1), 11)
assert.strictEqual(main(santasList), 2378066)

function partTwo(input) {
  const twoLists = getTwoLists(input)

  const cache = {}
  twoLists.list1.forEach((n) => {
    if (cache[n]) return
    cache[n] = 0
    twoLists.list2.forEach((m) => {
      if (n === m) {
        cache[n]++
      }
    })
  })

  return twoLists.list1.reduce((acc, n) => (acc += n * cache[n]), 0)
}

assert.strictEqual(partTwo(ex1), 31)
assert.strictEqual(partTwo(santasList), 18934359)

function getTwoLists(input) {
  return input
    .trim()
    .split('\n')
    .reduce(
      (acc, l) => {
        const [a, b] = l.split('   ')
        acc.list1.push(+a)
        acc.list2.push(+b)
        return acc
      },
      { list1: [], list2: [] }
    )
}

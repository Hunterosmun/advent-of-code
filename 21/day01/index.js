const fs = require('fs')
const input = fs.readFileSync('day1-input.txt', 'utf-8')
const assert = require('assert')

const input1 = `
199
200
208
210
200
207
240
269
260
263`

function parse (nums) {
  return nums
    .trim()
    .split('\n')
    .map(Number)
}

function howMany (list) {
  let placeholder = null
  let count = 0
  for (number of list) {
    if (placeholder != null && number > placeholder) count++
    placeholder = number
  }
  return count
}

assert.strictEqual(howMany(parse(input)), 1215)

function newList (nums) {
  const list = parse(nums)
  const newList = list.map((num, i) => {
    return list[i] + list[i + 1] + list[i + 2]
  })
  console.log(newList)
  return newList
}

console.log(howMany(newList(input)))

const fs = require('fs')
const santasList = fs.readFileSync('data.txt', 'utf-8')
const assert = require('assert')

const example = `
5 1 9 5
7 5 3
2 4 6 8`

function parse (list) {
  //first I need to parse it into an array of rows (so split by new line)
  const firstParse = list.trim().split('\n')

  //Then I need to take those rows and parse them into individual arrays of digits (so split by empty space)
  const secondParse = firstParse.map(row => {
    return row.split(/\s+/).map(Number)
  })
  return secondParse
}

function finddif (nums) {
  let top = nums[0]
  let bottom = nums[0]
  for (num of nums) {
    if (num > top) top = num
    if (num < bottom) bottom = num
  }
  return top - bottom
}

function getEm (list) {
  const parsedList = parse(list)
  let total = 0
  for (part of parsedList) {
    total += finddif(part)
  }
  return total
  // return parsedList.reduce((acc, el) => {
  //   const dif = finddif(el)
  //   return dif + acc
  // }, [])
}

assert.strictEqual(getEm(example), 18)
assert.strictEqual(getEm(santasList), 30994)

//
//
// Second part
//
//

const example2 = `
5 9 2 8
9 4 7 3
3 8 6 5`

function evensOnly (list) {
  const basic = parse(list)
  let total = 0
  for (section of basic) {
    const num = findDivis(section)
    total += num
  }
  return total
}

function findDivis (list) {
  for (let i = 0; i < list.length; i++) {
    const comparer = list.shift()
    for (let j = 0; j < list.length; j++) {
      const toCheck = comparer / list[j]
      if (toCheck % 1 === 0) {
        return toCheck
      }
    }
    list.push(comparer)
  }
}

assert.strictEqual(evensOnly(example2), 9)
assert.strictEqual(evensOnly(santasList), 233)

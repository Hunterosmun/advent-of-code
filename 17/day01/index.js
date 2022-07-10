const fs = require('fs')
const santasList = fs.readFileSync('list.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
1122 `,
  ex2 = `
1111
`,
  ex3 = `
1234
`,
  ex4 = `
91212129 `

// 1: need to go through the list and find any repeating numbers

function parse (list) {
  let parsedList = list.trim().split('')
  parsedList.push(parsedList[0])
  const repeats = []
  for (let i = 0; i < parsedList.length; i++) {
    if (parsedList[i] === parsedList[i + 1]) {
      repeats.push(parsedList[i])
    }
  }
  return repeats
}

// 2: take those repeating numbers and add them together

function add (list) {
  const theList = parse(list).map(Number)
  return theList.reduce((el, acc) => {
    return el + acc
  })
}

assert.strictEqual(add(santasList), 1144)

const fs = require('fs')
const assert = require('assert')
const santasList = fs.readFileSync('data.txt', 'utf-8')

const example = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

function parseList (list) {
  return list.trim().split('\n')
}

function getVarLists (list) {
  let total = []
  for (part of list) {
    for (let i = 0; i < part.length; i++) {
      total[i] = total[i] || []
      total[i].push(part[i])
    }
  }

  return total.map(list => list.join(''))
}

// parse list into sections of so many, each has a position

function firstProblem (list) {
  const newList = getVarLists(parseList(list))
  console
  const totals = newList.reduce((acc, el, j) => {
    for (let i = 0; i < el.length; i++) {
      acc[j] = acc[j] || 0
      if (el[i] === '1') acc[j] += 1
      else acc[j] -= 1
    }
    return acc
  }, {})

  return totals
}

function final (obj) {
  let string1 = []
  let string2 = []
  for (const key in obj) {
    if (obj[key] > 0) {
      string1.push('1')
      string2.push('0')
    } else {
      string1.push('0')
      string2.push('1')
    }
  }
  string1 = parseInt(string1.join(''), 2)
  string2 = parseInt(string2.join(''), 2)
  return string2 * string1
}

assert.strictEqual(final(firstProblem(santasList)), 3242606)

// {
//   '0': 54,
//   '1': -34,
//   '2': 38,
//   '3': 32,
//   '4': 22,
//   '5': 20,
//   '6': -20,
//   '7': -42,
//   '8': 10,
//   '9': 22,
//   '10': 34,
//   '11': -32
// }
// hunters-mbp:day03 hunterosmun$ node
// Welcome to Node.js v16.5.0.
// Type ".help" for more information.
// > parseInt('101111001110',2)
// 3022
// > parseInt('010000110001',2)
// 1073

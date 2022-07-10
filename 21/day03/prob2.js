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

function partTwo (list) {
  const newList = getVarLists(list)
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

// this function sends the right list to the parseTwo
function weed (list) {
  let trimList = parseList(list)
  let param = partTwo(trimList)
  let oxygen
  let co2
  //this part gets the oxygen
  for (const key in param) {
    // if (trimList.length === 2) {
    //   oxygen = parseTwo(key, 1, trimList)
    //   break
    // }
    if (param[key] >= 0) {
      trimList = parseTwo(key, 1, trimList)
    } else {
      trimList = parseTwo(key, 0, trimList)
    }
    if (trimList.length === 1) {
      oxygen = trimList
    }
    param = partTwo(trimList)
  }

  // this part gets the co2
  let trimList2 = parseList(list)
  param = partTwo(trimList2)
  for (const key in param) {
    // if (trimList2.length === 2) {
    //   co2 = parseTwo(key, 0, trimList2)
    //   break
    // }
    if (param[key] >= 0) {
      trimList2 = parseTwo(key, 0, trimList2)
    } else {
      trimList2 = parseTwo(key, 1, trimList2)
    }
    if (trimList2.length === 1) {
      co2 = trimList2
    }
    param = partTwo(trimList2)
  }

  return { oxygen, co2 }
}

// go through the list and cut out what isn't needed
function parseTwo (order, param, list) {
  const newList = []
  for (things of list) {
    for (let i = 0; i < things.length; i++) {
      if (i == order) {
        if (things[i] == param) newList.push(things)
      }
    }
  }
  return newList
}

function cleanup (list) {
  const finals = weed(list)
  const ox = parseInt(finals['oxygen'], 2)
  const co = parseInt(finals.co2, 2)
  return ox * co
}

assert.strictEqual(cleanup(santasList), 4856080)

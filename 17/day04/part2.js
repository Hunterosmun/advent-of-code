const fs = require('fs')
const santasList = fs.readFileSync('data.txt', 'utf-8')
const assert = require('assert')

//
// Need to check how many of these passwords "pass"
// to pass they can't have any similar phrasing
//
// So part 2 is WAY more intense
// I need to check each set of letters to see if they're the same
// I think I'll do something to organize them
// Then I can just compare the general list?
// I think I need to keep this first part though, cause the second part is in addition to the first
//

const example = `
abca bccb cc dard ezxe baca
abca bccb aa ada
aa bb cc dd aa 
aa bb cc dd aaa 
bb cc dd
bb bb bb
bb dd aa ss
bb dd dd
`
// 1st = valid, 2nd = not valid, 3rd = valid

function parse (list) {
  const rows = list.trim().split('\n')
  const collumns = rows.map(el => {
    return el.trim().split(/\s+/)
  })
  return collumns
}

function checkOne (list) {
  //call parse here
  const parsedList = checkTwo(list)
  //loop over each phrase, make an array for each that you compare the parts too. If it ever repeats then fail it
  const passed = []
  for (pass of parsedList) {
    const length = pass.length
    const check = []
    for (let i = 0; i < length; i++) {
      const toCheck = pass.shift()
      if (!check.includes(toCheck)) {
        check.push(toCheck)
      } else {
        break
      }
      if (check.length === length) {
        passed.push(check)
      }
    }
  }
  // console.log('passd first test: ' + [passed])
  //return number of passed tests
  return passed.length
}

function checkTwo (list) {
  const readyTwo = parse(list)
  // here I need to check for if parts are all the way the same (letter wise)
  // So I think I need to organize each grouping of letters, then check them against each other
  for (pass of readyTwo) {
    const length = pass.length
    for (let i = 0; i < length; i++) {
      let letter = pass.shift()
      letter = letter
        .split('')
        .sort()
        .join('')
      pass.push(letter)
    }
  }
  return readyTwo
}

assert.strictEqual(checkOne(example), 4)
assert.strictEqual(checkOne(santasList), 4)

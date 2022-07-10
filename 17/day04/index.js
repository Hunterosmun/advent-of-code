const fs = require('fs')
const santasList = fs.readFileSync('data.txt', 'utf-8')
const assert = require('assert')

//
// Need to check how many of these passwords "pass"
// to pass they can't have any similar phrasing
//

const example = `
aa bb cc dd ee 
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

function check (list) {
  //call parse here
  const parsedList = parse(list)
  //loop over each phrase, make an array for each that you compare the parts too. If it ever repeats then fail it
  let passed = parsedList.length
  for (pass of parsedList) {
    const length = pass.length
    const check = []
    for (let i = 0; i < length; i++) {
      const toCheck = pass.shift()
      if (!check.includes(toCheck)) {
        check.push(toCheck)
      } else {
        passed -= 1
        break
      }
    }
    // for (letr of pass) {
    //   console.log(letr)
    //   if (!check.includes(letr)) {
    //     if (pass.length === 1) {
    //       passed.push(pass)
    //     }
    //     check.push(letr)
    //   }
    //   if (check.includes(letr)) {
    //     break
    //   }
    //   console.log('check is: ' + check)
    // }
  }
  //return number of passed tests
  return passed
}

assert.strictEqual(check(santasList), 386)
assert.strictEqual(check(example), 4)

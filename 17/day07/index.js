const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf-8')
const assert = require('assert')

const example = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`

// This parse needs to check what programs are holding up what
// (objects will have a name, weight, and may have 1-many things it's holding)
// (1 total base, many total brances and many total middles)
//
function parse (list) {
  // makes array of lines
  const firstEd = list.trim().split('\n')

  const arrOfObj = []
  // Need to make an object to push into the array
  for (part of firstEd) {
    const regEx = /^([a-z]+) \(([0-9]+)\)(.*)/
    const [, one, two, three] = part.match(regEx)
    if (three === '') {
      arrOfObj.push({
        name: one,
        weight: two
      })
    } else {
      const regEx2 = / -> (.*)/
      const [, kids] = three.match(regEx2)
      const children = kids.split(', ')
      arrOfObj.push({
        name: one,
        weight: two,
        holding: children
      })
    }
  }
  return arrOfObj
}

// Need to organize the objects (maybe pulling them from an array till there are none left there?)
function organize (list) {
  const data = parse(list)

  // split the data into parts that have kids and parts that don't
  let hasKids = []
  let noKids = []
  for (part of data) {
    if (part.holding) {
      hasKids.push(part)
    } else {
      noKids.push(part)
    }
  }

  // This is where I check what the base number is
  let stacking = true
  while (stacking) {
    let i = -1
    for (part of hasKids) {
      for (check of hasKids) {
        i += 1
        for (kid of part.holding) {
          if (kid == check.name) {
            hasKids = hasKids.filter(el => el.name !== check.name)
          }
        }
      }
    }
    if (hasKids.length === 1) stacking = false
  }

  return hasKids[0].name
}

assert.strictEqual(organize(example), 'tknk')
assert.strictEqual(organize(data), 'svugo')

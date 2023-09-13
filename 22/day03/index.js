const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`

function main (input) {
  const list = input
    .trim()
    .split('\n')
    .map(t => {
      const length = t.length
      return {
        first: t.slice(0, length / 2),
        second: t.slice(length / 2, length)
      }
    })
  return list.reduce((acc, el) => {
    const letter = el.first.split('').filter(e => el.second.includes(e))[0]
    return acc + findVal(letter)
  }, 0)
}

assert.strictEqual(main(ex1), 157)
assert.strictEqual(main(santasList), 7967)

function partTwo (input) {
  const list = input.trim().split('\n')
  const splitList = splitTheList(list)

  return splitList.reduce((acc, el) => {
    const letter = el[0]
      .split('')
      .filter(e => el[1].includes(e) && el[2].includes(e))[0]
    return acc + findVal(letter)
  }, 0)
}

assert.strictEqual(partTwo(ex1), 70)
assert.strictEqual(partTwo(santasList), 2716)

//Lowercase item types a through z have priorities 1 through 26.
//Uppercase item types A through Z have priorities 27 through 52.
// 97 - 122 (a is 97, z is 122)
// 65 - 90 (A is 65, Z is 90)
function findVal (letter) {
  if (letter.charCodeAt() > 96) return letter.charCodeAt() - 96
  return letter.charCodeAt() - 64 + 26
}

// splits the list into chunks of 3
function splitTheList (arr, list = []) {
  if (!arr.length) return list
  const nextThree = arr.splice(0, 3)
  return splitTheList(arr, [...list, nextThree])
}

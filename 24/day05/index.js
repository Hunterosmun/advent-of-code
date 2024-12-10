const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`

function main(input) {
  const [rules, updates] = input.trim().split('\n\n')
  const rulesArr = rules.split('\n').map((rule) => rule.split('|').map(Number))
  const updatesArr = updates
    .split('\n')
    .map((update) => update.split(',').map(Number))

  let validUpdates = 0

  updatesArr.forEach((update) => {
    let valid = true
    update.sort((a, b) => {
      rulesArr.reduce((acc, [min, max]) => {
        if (a === min && b === max) {
          valid = false
          return -1
        }
        return acc
      }, 1)
    })
    if (valid) {
      validUpdates += update[Math.floor(update.length / 2)]
    }
  })

  return validUpdates
}

assert.strictEqual(main(ex1), 143)
assert.strictEqual(main(santasList), 6041)

function partTwo(input) {
  const [rules, updates] = input.trim().split('\n\n')
  const rulesArr = rules.split('\n').map((rule) => rule.split('|').map(Number))
  const updatesArr = updates
    .split('\n')
    .map((update) => update.split(',').map(Number))

  let validUpdates = 0

  updatesArr.forEach((update) => {
    let valid = true
    const preSorted = [...update]
    update.sort((a, b) => {
      return rulesArr.reduce((acc, [min, max]) => {
        if (a === min && b === max) {
          valid = false
          return -1
        }
        return acc
      }, 1)
    })
    if (!valid) {
      validUpdates += update[Math.floor(preSorted.length / 2)]
    }
  })

  return validUpdates
}

assert.strictEqual(partTwo(ex1), 123)
assert.strictEqual(partTwo(santasList), 4884)

const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`

function main(input) {
  return input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      let [total, parts] = line.split(':')
      total = Number(total)
      parts = parts.trim().split(' ').map(Number)

      const totals = getTotals([], parts)
      let validTotal = false
      totals.forEach((t) => {
        if (t === total) validTotal = true
      })

      if (validTotal) return acc + total
      else return acc
    }, 0)
}

function getTotals(usedParts, parts) {
  if (!parts.length) return usedParts
  if (!usedParts.length) {
    usedParts.push(parts[0])
    return getTotals(usedParts, parts.slice(1))
  }
  return usedParts.flatMap((used) => {
    return getTotals([used + parts[0], used * parts[0]], parts.slice(1))
  })
}

assert.strictEqual(main(ex1), 3749)
assert.strictEqual(main(santasList), 3245122495150)

function partTwo(input) {
  return input
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      let [total, parts] = line.split(':')
      total = Number(total)
      parts = parts.trim().split(' ').map(Number)

      const totals = getTotalsPartTwo([], parts)
      let validTotal = false
      totals.forEach((t) => {
        if (t === total) validTotal = true
      })

      if (validTotal) return acc + total
      else return acc
    }, 0)
}

function getTotalsPartTwo(usedParts, parts) {
  if (!parts.length) return usedParts
  if (!usedParts.length) {
    usedParts.push(parts[0])
    return getTotalsPartTwo(usedParts, parts.slice(1))
  }
  return usedParts.flatMap((used) => {
    return getTotalsPartTwo(
      [used + parts[0], used * parts[0], Number(`${used}` + parts[0])],
      parts.slice(1)
    )
  })
}

assert.strictEqual(partTwo(ex1), 11387)
assert.strictEqual(partTwo(santasList), 105517128211543)

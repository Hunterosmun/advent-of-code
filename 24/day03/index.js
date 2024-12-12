const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`
const ex2 = `
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
`

function main(input) {
  return input.match(/mul\((\d+),(\d+)\)/g).reduce((acc, el) => {
    const [_, num1, num2] = el.match(/mul\((\d+),(\d+)\)/).map(Number)
    return acc + num1 * num2
  }, 0)
}

assert.strictEqual(main(ex1), 161)
assert.strictEqual(main(santasList), 166630675)

// Janky but works. Probs should retry with a better approach XD
// function partTwo(input) {
//   const okAreas = input.matchAll(/do\(\)/g)
//   const fullCords = { startCords: [0], endCords: [] }
//   for (const area of okAreas) fullCords.startCords.push(area.index)

//   const badAreas = input.matchAll(/don't\(\)/g)
//   for (const area of badAreas) fullCords.endCords.push(area.index)

//   const cutCords = fullCords.startCords.reduce((acc, start, i) => {
//     if (!acc.length) return [{ start: start, end: fullCords.endCords[i] }]
//     if (start < acc[acc.length - 1].end) return acc
//     const end = fullCords.endCords.find((n) => n > start) ?? input.length
//     acc.push({ start, end })
//     return acc
//   }, [])

//   let str = ''
//   for (const { start, end } of cutCords) str += input.slice(start, end)
//   return main(str)
// }

function partTwo(input) {
  let active = true
  return input
    .match(/mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g)
    .reduce((acc, el) => {
      if (["don't()", 'do()'].includes(el)) {
        active = el === 'do()'
        return acc
      }
      if (!active) return acc
      const [_, num1, num2] = el.match(/mul\((\d+),(\d+)\)/).map(Number)
      return acc + num1 * num2
    }, 0)
}

assert.strictEqual(partTwo(ex2), 48)
assert.strictEqual(partTwo(santasList), 93465710)

const spoofPartOne = fs.readFileSync(__dirname + '/spoof.txt', 'utf-8')
const spoofPartTwo = fs.readFileSync(__dirname + '/spoof2.txt', 'utf-8')
function spoof(input) {
  return input
    .trim()
    .split('\n')
    .reduce((acc, el) => {
      const [num1, num2] = el.split(',').map(Number)
      console.log({ acc, num1, num2 })
      return acc + num1 * num2
    }, 0)
}

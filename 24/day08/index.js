const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
`

function main(input) {
  const grid = input
    .trim()
    .split('\n')
    .map((line) => line.split(''))
  const satelites = {}
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== '.') {
        if (!satelites[cell]) satelites[cell] = []
        satelites[cell].push({ x, y })
      }
    })
  })
  const triggeredAreas = {}
  Object.keys(satelites).forEach((key) => {
    const satelite = satelites[key]
    satelite.map((sat, i) => {
      for (let a = i + 1; a < satelite.length; a++) {
        const other = satelite[a]
        const xDiff = sat.x - other.x
        const yDiff = sat.y - other.y
        if (grid[sat.y + yDiff]?.[sat.x + xDiff]) {
          triggeredAreas[`${sat.x + xDiff},${sat.y + yDiff}`] = true
        }
        if (grid[other.y - yDiff]?.[other.x - xDiff]) {
          triggeredAreas[`${other.x - xDiff},${other.y - yDiff}`] = true
        }
      }
    })
  })
  return Object.keys(triggeredAreas).length
}

assert.strictEqual(main(ex1), 14)
assert.strictEqual(main(santasList), 295)

function partTwo(input) {
  // stuff here
}

assert.strictEqual(partTwo(ex1), 'answer')
assert.strictEqual(partTwo(santasList), 'answer')

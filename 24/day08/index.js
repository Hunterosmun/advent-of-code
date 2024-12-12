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
  const [grid, satellites] = getGridAndSatellites(input)
  const triggeredAreas = {}
  Object.keys(satellites).forEach((key) => {
    const satelite = satellites[key]
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
  const [grid, satellites] = getGridAndSatellites(input)
  const triggeredAreas = {}
  Object.keys(satellites).forEach((key) => {
    const satelite = satellites[key]
    satelite.map((sat, i) => {
      for (let a = i + 1; a < satelite.length; a++) {
        const other = satelite[a]
        triggeredAreas[`${sat.x},${sat.y}`] = true
        triggeredAreas[`${other.x},${other.y}`] = true
        const xDiff = sat.x - other.x
        const yDiff = sat.y - other.y
        let stillFindingThings = true
        let offset = 1
        do {
          if (grid[sat.y + yDiff * offset]?.[sat.x + xDiff * offset]) {
            triggeredAreas[
              `${sat.x + xDiff * offset},${sat.y + yDiff * offset}`
            ] = true
            offset++
          } else {
            stillFindingThings = false
          }
        } while (stillFindingThings)
        stillFindingThings = true
        offset = 1
        do {
          if (grid[other.y - yDiff * offset]?.[other.x - xDiff * offset]) {
            triggeredAreas[
              `${other.x - xDiff * offset},${other.y - yDiff * offset}`
            ] = true
            offset++
          } else {
            stillFindingThings = false
          }
        } while (stillFindingThings)
      }
    })
  })
  return Object.keys(triggeredAreas).length
}

assert.strictEqual(partTwo(ex1), 34)
assert.strictEqual(partTwo(santasList), 1034)

function getGridAndSatellites(input) {
  const grid = input
    .trim()
    .split('\n')
    .map((line) => line.split(''))
  const satellites = {}
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== '.') {
        if (!satellites[cell]) satellites[cell] = []
        satellites[cell].push({ x, y })
      }
    })
  })
  return [grid, satellites]
}

const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
30373
25512
65332
33549
35390
`

function main (input) {
  const { grid, width, height } = parseGrid(input)

  let numOfViewableTrees = width * 2 + height * 2 - 4
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const leftHalf = grid[y].slice(0, x).sort()
      const rightHalf = grid[y].slice(x + 1, width).sort()
      const tree = grid[y][x]
      if (leftHalf.at(-1) < tree) {
        numOfViewableTrees += 1
      } else if (rightHalf.at(-1) < tree) {
        numOfViewableTrees += 1
      } else {
        const column = grid.map(el => el[x])
        const topHalf = column.slice(0, y).sort()
        const bottomHalf = column.slice(y + 1, height).sort()
        if (topHalf.at(-1) < tree) {
          numOfViewableTrees += 1
        } else if (bottomHalf.at(-1) < tree) {
          numOfViewableTrees += 1
        }
      }
    }
  }

  return numOfViewableTrees
}

assert.strictEqual(main(ex1), 21)
assert.strictEqual(main(santasList), 1785)

function partTwo (input) {
  const { grid, width, height } = parseGrid(input)
  // yay! logic time!
}

assert.strictEqual(partTwo(ex1), 8)
assert.strictEqual(partTwo(santasList), 'answer')

function parseGrid (input) {
  const grid = input
    .trim()
    .split('\n')
    .map(line => line.split('').map(Number))
  const width = grid[0].length
  const height = grid.length
  return { grid, width, height }
}

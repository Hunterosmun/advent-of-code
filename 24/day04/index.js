const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`

function main(input) {
  const grid = input
    .trim()
    .split('\n')
    .map((el) => el.split(''))
  let count = 0
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      // Looking for the word "XMAS" in the grid, backwards/diagonal are ok
      // Check left/right
      // Check up/down
      // Check diagonals
      if (cell === 'X') {
        // Check right
        if (
          checkGrid(grid, i, j + 1, 'M') &&
          checkGrid(grid, i, j + 2, 'A') &&
          checkGrid(grid, i, j + 3, 'S')
        ) {
          count++
        }
        // Check left
        if (
          checkGrid(grid, i, j - 1, 'M') &&
          checkGrid(grid, i, j - 2, 'A') &&
          checkGrid(grid, i, j - 3, 'S')
        ) {
          count++
        }
        // Check down
        if (
          checkGrid(grid, i + 1, j, 'M') &&
          checkGrid(grid, i + 2, j, 'A') &&
          checkGrid(grid, i + 3, j, 'S')
        ) {
          count++
        }
        // Check up
        if (
          checkGrid(grid, i - 1, j, 'M') &&
          checkGrid(grid, i - 2, j, 'A') &&
          checkGrid(grid, i - 3, j, 'S')
        ) {
          count++
        }
        // Check down-right
        if (
          checkGrid(grid, i + 1, j + 1, 'M') &&
          checkGrid(grid, i + 2, j + 2, 'A') &&
          checkGrid(grid, i + 3, j + 3, 'S')
        ) {
          count++
        }
        // Check down-left
        if (
          checkGrid(grid, i + 1, j - 1, 'M') &&
          checkGrid(grid, i + 2, j - 2, 'A') &&
          checkGrid(grid, i + 3, j - 3, 'S')
        ) {
          count++
        }
        // Check up-right
        if (
          checkGrid(grid, i - 1, j + 1, 'M') &&
          checkGrid(grid, i - 2, j + 2, 'A') &&
          checkGrid(grid, i - 3, j + 3, 'S')
        ) {
          count++
        }
        // Check up-left
        if (
          checkGrid(grid, i - 1, j - 1, 'M') &&
          checkGrid(grid, i - 2, j - 2, 'A') &&
          checkGrid(grid, i - 3, j - 3, 'S')
        ) {
          count++
        }
      }
    })
  })
  return count
}

assert.strictEqual(main(ex1), 18)
assert.strictEqual(main(santasList), 2578)

function partTwo(input) {
  // Doing the same thing as part 1 EXCEPT instead of looking for XMAS we're looking for two MAS words that intersect at the A
  const grid = input
    .trim()
    .split('\n')
    .map((el) => el.split(''))
  let count = 0
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 'A') {
        // check Ms above and Ss below
        if (
          checkGrid(grid, i - 1, j + 1, 'M') &&
          checkGrid(grid, i - 1, j - 1, 'M') &&
          checkGrid(grid, i + 1, j + 1, 'S') &&
          checkGrid(grid, i + 1, j - 1, 'S')
        ) {
          count++
        }
        // check Ms below and Ss above
        if (
          checkGrid(grid, i + 1, j + 1, 'M') &&
          checkGrid(grid, i + 1, j - 1, 'M') &&
          checkGrid(grid, i - 1, j + 1, 'S') &&
          checkGrid(grid, i - 1, j - 1, 'S')
        ) {
          count++
        }
        // check Ms to the left and Ss to the right
        if (
          checkGrid(grid, i + 1, j + 1, 'M') &&
          checkGrid(grid, i - 1, j + 1, 'M') &&
          checkGrid(grid, i + 1, j - 1, 'S') &&
          checkGrid(grid, i - 1, j - 1, 'S')
        ) {
          count++
        }
        // check Ms to the right and Ss to the left
        if (
          checkGrid(grid, i + 1, j - 1, 'M') &&
          checkGrid(grid, i - 1, j - 1, 'M') &&
          checkGrid(grid, i + 1, j + 1, 'S') &&
          checkGrid(grid, i - 1, j + 1, 'S')
        ) {
          count++
        }
      }
    })
  })
  return count
}

assert.strictEqual(partTwo(ex1), 9)
assert.strictEqual(partTwo(santasList), 1972)

function checkGrid(grid, i, j, val) {
  if (grid[i]?.[j] && grid[i][j] === val) {
    return true
  }
  return false
}

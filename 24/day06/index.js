const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`

function main(input) {
  const map = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))
  let stillWalking = true
  const guardPos = {
    x: map.findIndex((row) => row.includes('^')),
    y: map.find((r) => r.includes('^')).indexOf('^'),
    direction: 'up',
  }
  do {
    // Here we will move the guard
    // If there is ever a '#' where the guard was going to walk, then we turn them 90 degrees to the right
    // whenever they move, we place an X where they were
    // If they move off of the map, we stop
    if (guardPos.direction === 'up') {
      if (!map[guardPos.x - 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x - 1][guardPos.y] === '#') {
        guardPos.direction = 'right'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.x -= 1
      }
    }
    if (guardPos.direction === 'right') {
      if (!map[guardPos.x][guardPos.y + 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x][guardPos.y + 1] === '#') {
        guardPos.direction = 'down'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.y += 1
      }
    }
    if (guardPos.direction === 'down') {
      if (!map[guardPos.x + 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x + 1][guardPos.y] === '#') {
        guardPos.direction = 'left'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.x += 1
      }
    }
    if (guardPos.direction === 'left') {
      if (!map[guardPos.x][guardPos.y - 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x][guardPos.y - 1] === '#') {
        guardPos.direction = 'up'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.y -= 1
      }
    }
  } while (stillWalking)
  // Once we stop, we count the Xs on the map
  return map.flat().filter((el) => el === 'X').length
}

assert.strictEqual(main(ex1), 41)
assert.strictEqual(main(santasList), 5199)

function partTwo(input) {
  const map = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))

  let numLoops = 0
  map.forEach((row, i) => {
    row.forEach((_el, j) => {
      const newMap = structuredClone(map)
      if (['#', '^'].includes(newMap[i][j])) return
      newMap[i][j] = '#'
      if (findIfLoop(newMap)) numLoops++
    })
  })
  return numLoops
}

function findIfLoop(map) {
  const guardPos = {
    x: map.findIndex((row) => row.includes('^')),
    y: map.find((r) => r.includes('^')).indexOf('^'),
    direction: 'up',
  }
  let stillWalking = true
  let cycles = 0
  do {
    // Here we will move the guard
    // If there is ever a '#' where the guard was going to walk, then we turn them 90 degrees to the right
    // whenever they move, we place an X where they were
    // If they move off of the map, we stop
    if (guardPos.direction === 'up') {
      if (!map[guardPos.x - 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x - 1][guardPos.y] === '#') {
        guardPos.direction = 'right'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.x -= 1
      }
    }
    if (guardPos.direction === 'right') {
      if (!map[guardPos.x][guardPos.y + 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x][guardPos.y + 1] === '#') {
        guardPos.direction = 'down'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.y += 1
      }
    }
    if (guardPos.direction === 'down') {
      if (!map[guardPos.x + 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x + 1][guardPos.y] === '#') {
        guardPos.direction = 'left'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.x += 1
      }
    }
    if (guardPos.direction === 'left') {
      if (!map[guardPos.x][guardPos.y - 1]) {
        stillWalking = false
        map[guardPos.x][guardPos.y] = 'X'
        break
      }
      if (map[guardPos.x][guardPos.y - 1] === '#') {
        guardPos.direction = 'up'
      } else {
        map[guardPos.x][guardPos.y] = 'X'
        guardPos.y -= 1
      }
    }
    cycles++
    // Actual max from earlier was 5904
  } while (stillWalking && cycles < 7000)
  return stillWalking
}

assert.strictEqual(partTwo(ex1), 6)
assert.strictEqual(partTwo(santasList), 1915)

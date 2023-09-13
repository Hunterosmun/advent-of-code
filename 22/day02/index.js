const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
A Y
B X
C Z
`

// const opponent = { A: 'rock', B: 'paper', C: 'scissors' }
// const me = { X: 'rock', Y: 'paper', Z: 'scissors' }
// this is the solutions object
const solutionsOne = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 7, Y: 2, Z: 6 }
}
// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

// 1 for Rock, 2 for Paper, and 3 for Scissors
// plus
// 0 if you lost, 3 if the round was a draw, and 6 if you won
function main (input) {
  const steps = prepSteps(input)

  return steps.reduce((acc, step) => {
    return (acc += solutionsOne[step[0]][step[1]])
  }, 0)
}
// oof, try 1
// function main (input) {
//   const steps = prepSteps(input)

//   return steps.reduce((acc, step) => {
//     const yourMove = me[step[1]]
//     const theirMove = opponent[step[0]]
//     if (yourMove === 'rock') {
//       if (theirMove === 'paper') {
//         return acc + 1
//       } else if (theirMove === 'scissors') {
//         return acc + 7
//       } else {
//         return acc + 4
//       }
//     }
//     if (yourMove === 'paper') {
//       if (theirMove === 'rock') {
//         return acc + 8
//       } else if (theirMove === 'scissors') {
//         return acc + 2
//       } else {
//         return acc + 5
//       }
//     }
//     if (yourMove === 'scissors') {
//       if (theirMove === 'paper') {
//         return acc + 9
//       } else if (theirMove === 'rock') {
//         return acc + 3
//       } else {
//         return acc + 6
//       }
//     }
//   }, 0)
// }

assert.strictEqual(main(ex1), 15)
assert.strictEqual(main(santasList), 11841)

const solutionsTwo = {
  A: { X: 3, Y: 4, Z: 8 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 2, Y: 6, Z: 7 }
}

function partTwo (input) {
  const steps = prepSteps(input)

  return steps.reduce((acc, step) => {
    return (acc += solutionsTwo[step[0]][step[1]])
  }, 0)
}
// const conditionNeeded = { X: 'lose', Y: 'draw', Z: 'win' }

// function partTwo (input) {
//   const steps = prepSteps(input)

//   return steps.reduce((acc, step) => {
//     const condition = conditionNeeded[step[1]]
//     const theirMove = opponent[step[0]]
//     if (condition === 'lose') {
//       if (theirMove === 'paper') {
//         return acc + 1
//       } else if (theirMove === 'scissors') {
//         return acc + 2
//       } else {
//         return acc + 3
//       }
//     }
//     if (condition === 'draw') {
//       if (theirMove === 'rock') {
//         return acc + 4
//       } else if (theirMove === 'scissors') {
//         return acc + 6
//       } else {
//         return acc + 5
//       }
//     }
//     if (condition === 'win') {
//       if (theirMove === 'paper') {
//         return acc + 9
//       } else if (theirMove === 'rock') {
//         return acc + 8
//       } else {
//         return acc + 7
//       }
//     }
//   }, 0)
// }

assert.strictEqual(partTwo(ex1), 12)
assert.strictEqual(partTwo(santasList), 13022)

function prepSteps (input) {
  return input
    .trim()
    .split('\n')
    .map(s => s.trim().split(' '))
}

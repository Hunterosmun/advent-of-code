const fs = require('fs')
const santasList = fs.readFileSync('data.txt', 'utf-8')

const sample = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

function firstParse (list) {
  const [instructions, ...newList] = list.trim().split('\n\n')
  const boards = newList.map(board => {
    return board.split('\n').map(row => {
      return row.trim().split(/\s+/)
    })
  })
  return { instructions, boards }
}

function bingo (list) {
  let { instructions, boards } = firstParse(list)
  instructions = instructions.split(',')
  const winningBoards = []
  let firstwin = -1
  let lastwin = -1
  instructions.map(inst => {
    boards.map((board, bonum) => {
      // console.log(board)
      for (row of board) {
        // console.log(row)
        for (let i = 0; i < row.length; i++) {
          if (row[i] === inst) {
            row[i] = ' '
          }
        }
        let fiveRow = 0
        for (let i = 0; i < row.length; i++) {
          if (row[i] === ' ') fiveRow++
          if (fiveRow === 5) {
            if (!winningBoards[bonum]) {
              if (firstwin !== -1) {
                firstwin = bonum
              }
              lastwin = bonum
              winningBoards[bonum] = {
                last: inst,
                board: [].concat(...board)
              }
            }
          }
        }
      }
      const possible = [0, 0, 0, 0, 0]
      for (let i = 0; i < board.length; i++) {
        const row = board[i]
        for (let j = 0; j < row.length; j++) {
          if (row[j] === ' ') {
            possible[j] += 1
          }
        }
        for (thing of possible) {
          if (thing === 5) {
            if (!winningBoards[bonum]) {
              if (firstwin !== -1) {
                firstwin = bonum
              }
              lastwin = bonum
              winningBoards[bonum] = {
                last: inst,
                board: [].concat(...board)
              }
            }
          }
        }
      }
    })
  })
  console.log(winningBoards)
  const lastboardwin = winningBoards.length - 1
  return winningBoards[lastwin]
  // return winningBoards[0]
}

function score ({ last, board }) {
  last = Number(last)
  const sum = board
    .filter(el => el !== ' ')
    .map(Number)
    .reduce((acc, el) => {
      return acc + el
    })
  return sum * last
}

console.log(score(bingo(santasList)))

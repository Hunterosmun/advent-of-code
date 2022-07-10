const fs = require('fs')
const santasList = fs.readFileSync('list.txt', 'utf-8')
const assert = require('assert')

//
//
// Part 2
//
//

function jumpParse (list) {
  const parsedList = list.trim().split('')
  const halfway = parsedList.length / 2
  const firsthalf = list.slice(0, halfway)
  parsedList.push(...firsthalf)
  const repeats = []

  for (let i = 0; i < parsedList.length; i++) {
    if (parsedList[i] === parsedList[i + halfway]) {
      repeats.push(parsedList[i])
    }
  }
  return repeats
}
// console.log(jumpParse('123123'))

function jumpAdd (list) {
  const theList = jumpParse(list).map(Number)
  return theList.reduce((el, acc) => {
    return el + acc
  })
}

assert.strictEqual(jumpAdd(santasList), 1194)

//
///
//didn't work XD
//
// Tried to make it circular...
//
//
function attemptCircular (list) {
  let parsedList = list.trim().split('')
  const halfway = parsedList.length / 2
  parsedList.push(...parsedList)
  console.log(parsedList)
  const repeats = []

  //

  for (let i = 0, len = parsedList.length; i < len; i++) {
    for (let j = 0; j < halfway; j++) {
      if (parsedList[i % len === j % len]) {
        console.log('foundone!')
      }
      // console.log(parsedList[(i + j) % len])

      // if(parsedList[i] === [parsedList[j]){
      //   console.log(parsedList[i])
      // }
    }
  }

  //

  // for (let i = 0; i < parsedList.length; i++) {
  //   if (parsedList[i] === parsedList[i + halfway]) {
  //     repeats.push(parsedList[i])
  //   }
  // }
  return repeats
}

// console.log(attemptCircular('123425'))

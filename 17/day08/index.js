const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const exampleInput = `
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`

function main (text) {
  const allNums = {}
  const instructions = parseInstructions(text, allNums)
  let highestNum = 0
  instructions.forEach(struc => {
    const check = checkCondition(
      allNums,
      struc.toggleRegister,
      struc.toggle,
      struc.toggleAmount
    )

    if (check) {
      const newNum = struc.changeFunc(allNums[struc.toChange])
      allNums[struc.toChange] = newNum
      if (newNum > highestNum) highestNum = newNum
    }
  })

  return {
    answer: Object.keys(allNums).reduce((acc, el) => {
      if (allNums[el] > acc) return allNums[el]
      return acc
    }, 0),
    highestNum
  }
}

function parseInstructions (text, allNums) {
  const list = text.trim().split('\n')
  // const regEx = /([a-z]*) (inc|dec) ([-0-9]*) if ([a-z]*) (>|>=|<|<=|==) ([0-9]*)/
  const regEx = /([a-z]*) (inc|dec) ([-0-9]*) if ([a-z]*) ([><=!]*) ([-0-9]*)/

  return list.map(el => {
    const [
      ,
      toChange,
      operation,
      changeNum,
      toggleRegister,
      toggle,
      toggleAmount
    ] = regEx.exec(el)

    if (!(toChange in allNums)) allNums[toChange] = 0
    if (!(toggleRegister in allNums)) allNums[toggleRegister] = 0

    const parseNum = +changeNum
    return {
      toChange,
      toggleRegister,
      toggle,
      toggleAmount: +toggleAmount,
      changeFunc:
        operation === 'inc' ? num => num + parseNum : num => num - parseNum
    }
  })
}

function checkCondition (allNums, toggleRegister, toggle, toggleAmount) {
  switch (toggle) {
    case '<':
      return allNums[toggleRegister] < toggleAmount
    case '>':
      return allNums[toggleRegister] > toggleAmount
    case '<=':
      return allNums[toggleRegister] <= toggleAmount
    case '>=':
      return allNums[toggleRegister] >= toggleAmount
    case '==':
      return allNums[toggleRegister] == toggleAmount
    case '!=':
      return allNums[toggleRegister] != toggleAmount
    default:
      console.log("Error: There's a toggle case you aren't handling.")
  }
}

assert.deepStrictEqual(main(exampleInput), { answer: 1, highestNum: 10 })
assert.deepStrictEqual(main(input), { answer: 4888, highestNum: 7774 })

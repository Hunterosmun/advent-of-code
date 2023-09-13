const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

function main (input) {
  const { instructions, stacks } = parse(input)
  instructions.forEach(struct => {
    for (let i = 0; i < struct.num; i++) {
      const moveThing = stacks[struct.from].shift()
      stacks[struct.to].unshift(moveThing)
    }
  })
  return Object.keys(stacks).reduce((acc, stack) => {
    return acc + stacks[stack].shift()
  }, '')
}

assert.strictEqual(main(ex1), 'CMZ')
assert.strictEqual(main(santasList), 'GRTSWNJHH')

function partTwo (input) {
  const { instructions, stacks } = parse(input)
  instructions.forEach(struct => {
    const moveThing = stacks[struct.from].splice(0, struct.num)
    stacks[struct.to] = [...moveThing, ...stacks[struct.to]]
  })
  return Object.keys(stacks).reduce((acc, stack) => {
    return acc + stacks[stack].shift()
  }, '')
}

assert.strictEqual(partTwo(ex1), 'MCD')
assert.strictEqual(partTwo(santasList), 'QLFQDBBHM')

function parse (input) {
  let [preStacks, instructions] = input.split('\n\n')
  preStacks = preStacks.split('\n').filter(Boolean)
  const numStacks = +preStacks
    .pop()
    .trim()
    .split('')
    .pop()
  const stacks = {}
  for (let i = 0; i < numStacks; i++) {
    stacks[i + 1] = []
  }
  preStacks.forEach(stack => {
    stack = stack.split('')
    for (let i = 0; i < numStacks; i++) {
      const thing = stack[4 * i + 1]
      if (thing !== ' ') {
        stacks[i + 1].push(stack[4 * i + 1])
      }
    }
  })

  instructions = instructions
    .trim()
    .split('\n')
    .map(i => {
      const [num, from, to] = i
        .split(/[move|from|to]/)
        .filter(Boolean)
        .map(s => +s.trim())
      return { num, from, to }
    })

  return { stacks, instructions }
}

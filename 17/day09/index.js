const fs = require('fs')
const input = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const exampleInput1 = '{{},{}}'
const exampleInput2 = '{{{},{},{{}}}}'
const exampleInput3 = '{{<!!>},{<!!>},{<!!>},{<!!>}}'
const exampleInput4 = '{{<a!>},{<a!>},{<a!>},{<ab>}}'
/*
Example Inputs:

{}, 1 group.
{{{}}}, 3 groups.
{{},{}}, also 3 groups.
{{{},{},{{}}}}, 6 groups.
{<{},{},{{}}>}, 1 group (which itself contains garbage).
{<a>,<a>,<a>,<a>}, 1 group.
{{<a>},{<a>},{<a>},{<a>}}, 5 groups.
{{<!>},{<!>},{<!>},{<a>}}, 2 groups (since all but the last > are canceled).
Your goal is to find the total score for all groups in your input. Each group is assigned a score which is one more than the score of the group that immediately contains it. (The outermost group gets a score of 1.)

{}, score of 1.
{{{}}}, score of 1 + 2 + 3 = 6.
{{},{}}, score of 1 + 2 + 2 = 5.
{{{},{},{{}}}}, score of 1 + 2 + 3 + 3 + 3 + 4 = 16.
{<a>,<a>,<a>,<a>}, score of 1.
{{<ab>},{<ab>},{<ab>},{<ab>}}, score of 1 + 2 + 2 + 2 + 2 = 9.
{{<!!>},{<!!>},{<!!>},{<!!>}}, score of 1 + 2 + 2 + 2 + 2 = 9.
{{<a!>},{<a!>},{<a!>},{<ab>}}, score of 1 + 2 = 3.

*/

function main (text) {
  const chars = text
    .trim()
    .split(/!./)
    .join('')
    .split(/<.*>/)
    .join('')
    .split('')

  const groups = parseGroups(chars)

  console.log('--------------')
  console.log(JSON.stringify(groups, null, 2))
}

// let groups = {}
let id = 0

// function parseGroups (letters, parentTrail = []) {
//   if (!letters.length) return
//   const curLetter = letters.shift()
//   if (curLetter === '{') {
//     // new group
//     groups[id] = { parent: parentTrail[0] }
//     id += 1
//     return parseGroups(letters, [id - 1, ...parentTrail])
//   }
//   if (curLetter === '}') {
//     // end group
//     parentTrail.shift()
//     return parseGroups(letters, parentTrail)
//   }
// }

function parseGroups (letters, parentTrail = [], groups = {}) {
  if (!letters.length) return groups
  const curLetter = letters.shift()
  if (curLetter === '{') {
    // new group
    groups[id] = {
      parent: parentTrail[0],
      children: parseGroups(letters, [id, ...parentTrail], {})
    }
    id += 1
  }
  if (curLetter === '}') {
    return groups
  }
  return parseGroups(letters, parentTrail, groups)
}

// main(input)
// main('<!!!>>{{}}{!}{}!}}')

main(exampleInput1)
main(exampleInput2)
main(exampleInput3)
main(exampleInput4)

// assert.deepStrictEqual(main(exampleInput1), { answer: 1, highestNum: 10 })
// assert.deepStrictEqual(main(input), { answer: 4888, highestNum: 7774 })

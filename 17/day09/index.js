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

function part1 (text) {
  const chars = text
    .trim()
    .split(/!./)
    .join('')
    .split(/<[^>]*>/)
    .join('')
    .split('')

  const groups = parseGroups(chars)

  getScores(groups)

  return addScores(groups)
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

function getScores (groups, parentScore = 0) {
  // console.log(groups)
  Object.values(groups).map(group => {
    group.score = parentScore + 1
    if (group?.children) {
      getScores(group.children, group.score)
      // group.score = Object.values(group.children).reduce(
      //   (score, child) => child.score + score,
      //   1
      // )
    }
    // if (Object?.values(groups)?.length) {
    //   Object.values(groups).map(g => getScores(g))
    // }
    return 0
  })
}

function addScores (groups) {
  return Object.values(groups).reduce((acc, group) => {
    if (group.children) {
      return addScores(group.children) + group.score + acc
    } else {
      return group.score + acc
    }
  }, 0)
}

assert.equal(part1(exampleInput1), 5)
assert.equal(part1(exampleInput2), 16)
assert.equal(part1(exampleInput3), 9)
assert.equal(part1(exampleInput4), 3)
assert.equal(part1(input), 21037)

// ---- part2 ----

const exampleInput5 = '{<{o"i!a,<{i<a>}'

function part2 (text) {
  const beforeTrash = text.trim().split(/!./).join('').length

  const afterTrash = text
    .trim()
    .split(/!./)
    .join('')
    .split(/<[^>]*>/)
    .join('<>').length

  return beforeTrash - afterTrash
}

assert.equal(part2(exampleInput1), 0)
assert.equal(part2(exampleInput2), 0)
assert.equal(part2(exampleInput3), 0)
assert.equal(part2(exampleInput4), 17)
assert.equal(part2(exampleInput5), 10)
assert.equal(part2(input), 9495)

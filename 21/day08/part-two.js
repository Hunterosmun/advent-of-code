const path = require('path')
const fs = require('fs')
const santasList = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
const assert = require('assert')

//
// Need to decode lotsa numbers from lotsa confusing numbers
// Part 1 we're focusing on the smaller numbers (W/ unique lengths)

const example = `
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`

function parse (list) {
  // I think I'm finidng things that are ... 2,3,4,or7 digits? (That's how many 1,4,7,& 8 have in them)
  const firstParse = list.trim().split('\n')

  const secondParse = []
  for (const part of firstParse) {
    secondParse.push(part.split(' | '))
  }

  // Organize everything that I parse to make matching easier
  const sections = []
  for (const line of secondParse) {
    const holder = {}
    holder['input'] = line[0].split(' ').map(el => {
      return (el = el
        .split('')
        .sort()
        .join(''))
    })
    holder['output'] = line[1].split(' ').map(el => {
      return (el = el
        .split('')
        .sort()
        .join(''))
    })
    sections.push(holder)
  }

  return sections
}

//
// This will be a function that I send individual lines of the code
function makeCipher (line) {
  let toDecode = line.input
  const cipher = {}

  //find 1,4,7,8
  for (let i = 0; i < toDecode.length; i++) {
    if (toDecode[i].length === 2) cipher['1'] = toDecode[i]
    if (toDecode[i].length === 3) cipher['7'] = toDecode[i]
    if (toDecode[i].length === 4) cipher['4'] = toDecode[i]
    if (toDecode[i].length === 7) cipher['8'] = toDecode[i]
  }
  toDecode = toDecode.filter(el => el.length === 5 || el.length === 6)

  // (what an 8 has that a 7 doesn't) = piece that only 6 will have all of (This shall be called THING)
  const sevToEight = findLetDif(cipher['7'], cipher['8']).join('')
  for (const part of toDecode) {
    // if (part.includes(sevToEight)) console.log('found one! ' + part)
    if (part.length === 6) {
      if (findLetDif(sevToEight, part).length === 2) cipher['6'] = part
    }
  }
  toDecode = toDecode.filter(el => el !== cipher['6'])

  // Then use this "THING" and take out (What 4 has that 1 doesn't) = THING2
  const oneToFour = findLetDif(cipher['4'], cipher['1']).join('')
  const forZerTwo = findLetDif(oneToFour, sevToEight).join('')

  // THING2 can find 0 & 2 (0 is 6 length, 2 is 5 length)
  for (const part of toDecode) {
    if (findSim(part, forZerTwo).length === 2) {
      if (part.length === 6) cipher['0'] = part
      if (part.length === 5) cipher['2'] = part
    }
  }
  toDecode = toDecode.filter(el => el !== cipher['0'])
  toDecode = toDecode.filter(el => el !== cipher['2'])

  // Anything left after this with a length of 6 is a 9
  for (const part of toDecode) {
    if (part.length === 6) cipher['9'] = part
  }
  toDecode = toDecode.filter(el => el !== cipher['9'])

  // Now with the remaining, if it has both the parts that 1 has: it is a 3, otherwise it's a 5
  for (const part of toDecode) {
    if (findSim(part, cipher['1']).length === 2) {
      cipher['3'] = part
    } else {
      cipher['5'] = part
    }
  }

  return cipher
}

function findLetDif (let1, let2) {
  let big, small
  if (let1.length > let2.length) {
    big = let1
    small = let2
  } else {
    big = let2
    small = let1
  }

  const dif = []

  for (const part of big) {
    if (!small.includes(part)) dif.push(part)
  }
  return dif
}

function findSim (let1, let2) {
  let big, small
  if (let1.length > let2.length) {
    big = let1
    small = let2
  } else {
    big = let2
    small = let1
  }

  const dif = []

  for (const part of big) {
    if (small.includes(part)) dif.push(part)
  }
  return dif
}

//
// This function will send individual lines to the findNum section & make an array of output keys
function main (list) {
  const data = parse(list)

  let keys
  const toAdd = []

  for (const line of data) {
    let outputVal = []
    keys = makeCipher(line)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 10; j++) {
        // if (line.output[i] === keys[j]) outputVal.concat(`${j}`)
        if (line.output[i] === keys[j]) outputVal.push(j)
      }
    }
    toAdd.push(outputVal.join(''))
  }
  return toAdd.reduce((acc, el) => {
    el = Number(el)
    return acc + el
  }, 0)
}

function findSimple (list) {
  const data = parse(list)

  // I'll use this number to count all of the parts that are 2,3,4,7 digits long
  let howMany = 0

  // Need to loop over the whole array of objects, then loop over each objects 'output' & check for length
  for (const line of data) {
    // const length = Object.keys(line).length
    for (let i = 0; i < line.output.length; i++) {
      if (
        line.output[i].length === 2 ||
        line.output[i].length === 3 ||
        line.output[i].length === 4 ||
        line.output[i].length === 7
      ) {
        howMany++
      }
    }
  }
  return howMany
}

// End goal is to decode all of the output values, concat the individual value parts together, then add the outputs together
assert.strictEqual(findSimple(example), 26)
assert.strictEqual(findSimple(santasList), 392)

assert.strictEqual(main(example), 61229)
assert.strictEqual(main(santasList), 1004688)

//
//
//
//
// Puzzle Logic:

// 10 unique signal Patterns -> 4 digit output value
// They corespond somehow?

// *** = unique
//
// Zero: 6 segments (all same as 8 - 1 segments (the middle segment)
// *** One: 2 segments
// Two: 5 segments
// Three: 5 segments (all same as 2 except for one segment)
// *** Four: 4 segments
// Five: 5 segments
// Six: 6 segments (similar to 0,8,9, just a dif section missing)
// *** Seven: 3 segments (same as 1 except for 1. Can use this to identify what are the two right side sections & what's the top (good for elimination?))
// *** Eight: 7 segments (so max)
// Nine: 6 segments (same as 8 but minus one... slightly dif from 0)
//
// Numbers and how many segments they are comprised of:
//
//  0:      1: *    2:      3:      4: *
//  aaaa    ....    aaaa    aaaa    ....
//  b    c  .    c  .    c  .    c  b    c
//  b    c  .    c  .    c  .    c  b    c
//   ....    ....    dddd    dddd    dddd
//  e    f  .    f  e    .  .    f  .    f
//  e    f  .    f  e    .  .    f  .    f
//   gggg    ....    gggg    gggg    ....

//    5:      6:      7: *    8: *    9:
//   aaaa    aaaa    aaaa    aaaa    aaaa
//  b    .  b    .  .    c  b    c  b    c
//  b    .  b    .  .    c  b    c  b    c
//   dddd    dddd    ....    dddd    dddd
//  .    f  e    f  .    f  e    f  .    f
//  .    f  e    f  .    f  e    f  .    f
//   gggg    gggg    ....    gggg    gggg
//
// Section parts:
// top -> Compare 1 to 7, difference is top
// bottom -> Once you have top, use that and 4 to compare w/ nine and get bottom
// left bottom -> compare 8 (exclude 4, top, an bottom) (if two things are the same except for this one thing, that's 5 and 6)
// middle
// left top
// right top
// right bottom

// Numbers and how to get them:
// 1,4,7,8 -> Already have worked out (but need to work in logic gate based on size)
//
// Compare 8 w/ all 6 length things (0,6,9). -> Find dif between 1&4, if the compared to 8 thing shares only 1 thing w/ that then it's 0
//      Using this we can find the center part

// six segmenters -> 0,6,9
// five segmenters -> 2,3,5

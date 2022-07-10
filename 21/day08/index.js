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

// apparently it's a matter of what comes before (input) the grep and what comes after (output values)?
function parse (list) {
  // I think I'm finidng things that are ... 2,3,4,or7 digits? (That's how many 1,4,7,& 8 have in them)
  const firstParse = list.trim().split('\n')

  const secondParse = []
  for (const part of firstParse) {
    secondParse.push(part.split(' | '))
  }

  const sections = []
  for (const line of secondParse) {
    const holder = {}
    holder['input'] = line[0].split(' ')
    holder['output'] = line[1].split(' ')
    sections.push(holder)
  }

  return sections
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

assert.strictEqual(findSimple(example), 26)
assert.strictEqual(findSimple(santasList), 239)

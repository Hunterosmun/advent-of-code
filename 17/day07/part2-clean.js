const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf-8')
const assert = require('assert')

const example = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`

function parse (list) {
  // makes array of lines
  const firstEd = list.trim().split('\n')

  // Need to make an object to push into the array
  const parsed = firstEd.reduce((acc, el) => {
    const regEx = /^([a-z]+) \(([0-9]+)\)(.*)/
    const [, one, two, three] = el.match(regEx)
    const part = { name: one, weight: Number(two), holding: [] }
    if (three) part.holding = three.replace(' -> ', '').split(', ')
    return [...acc, part]
  }, [])

  const parsedObj = parsed.reduce((acc, el) => ({ ...acc, [el.name]: el }), {})
  return makeStack(findFirst(parsed), parsedObj)
}

function findFirst (data) {
  // This is where I check what the base number is
  const allKids = data.flatMap(el => el.holding)
  return data.find(el => !allKids.includes(el.name))
}

// Recursion time!
function makeStack (obj, list) {
  return { ...obj, holding: obj.holding.map(el => makeStack(list[el], list)) }
}

// Recursion2
function weightDif (obj) {
  return obj.holding.reduce((acc, el) => acc + weightDif(el), obj.weight)
}

// Helper function for locateDif
function difPart (arr) {
  return arr.reduce((acc, el, i) => {
    if (el in acc) {
      acc[el].times += 1
    } else {
      acc[el] = { times: 1, pos: i }
    }
    return acc
  }, {})
}

// recursion #3
function locateDif (obj) {
  const keys = difPart(obj.holding.map(weightDif))
  if (Object.keys(keys).length === 1) return obj.weight

  for (const parts in keys) {
    if (keys[parts].times === 1) return locateDif(obj.holding[keys[parts].pos])
  }
}

function main (list) {
  // using findFirst gives me the base point of the tree
  const tree = parse(list)

  // here's where I find the difference we need to take out
  let branchWeights = difPart(tree.holding.map(weightDif))
  let [a, b] = Object.entries(branchWeights)
    .sort((a, b) => a[1].times - b[1].times)
    .map(([key, _]) => Number(key))

  return locateDif(tree) - (a - b)
}

assert.strictEqual(main(example), 60)
assert.strictEqual(main(data), 1152)

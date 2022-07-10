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
  return firstEd.reduce((acc, el) => {
    const regEx = /^([a-z]+) \(([0-9]+)\)(.*)/
    const [, one, two, three] = el.match(regEx)
    const part = { name: one, weight: Number(two) }

    if (three !== '') {
      const regEx2 = / -> (.*)/
      const [, kids] = three.match(regEx2)
      const children = kids.split(', ')

      part.holding = children
    }
    return [...acc, part]
  }, [])
}

function findFirst (list) {
  const data = parse(list)

  // split the data into parts that have kids and parts that don't
  let hasKids = data.filter(el => el.holding)
  let noKids = data.filter(el => !el.holding)

  // This is where I check what the base number is
  const allKids = hasKids.reduce((acc, el) => {
    return [...acc, ...el.holding]
  }, [])
  return hasKids.filter(el => !allKids.includes(el.name)).pop()
}

// Recursion time!
function makeStack (obj, list) {
  if (!obj.holding) return obj
  // if (Object.keys(obj).length === 2) return obj
  // here I need to add a check through the list to assign a piece of list to holding
  // obj.holding = obj.holding.reduce((acc, el) => {
  //   const newEl = list.filter(part => part.name === el).pop()
  //   return [...acc, newEl]
  // }, [])

  obj.holding = obj.holding.map(el => {
    return list.filter(part => part.name === el).pop()
  })

  obj.holding = obj.holding.map(el => makeStack(el, list))
  return obj
}

function singleDif (arr) {
  // here I need to check if the array has all the same but one
  return arr.reduce((acc, el) => {
    if (!acc.includes(el)) return [...acc, el]
    return [...acc]
  }, [])
}

// Recursion number two!!
function weightDifTryOne (arr) {
  // I passed an array w/ the object in here
  return arr.map(el => {
    // let nums = el.holding.map(el => el.weight)
    // nums.push(el.weight)
    // Ok ok, so I did this bottom part first then the top...
    // But I think I misunderstood the question. Let's try again

    let nums = el.holding.reduce((acc, el) => {
      const weight =
        el.weight +
        el.holding.reduce((acc, thing) => {
          return acc + thing.weight
        }, 0)
      return [...acc, weight]
    }, [])
    console.log(nums)
    // base case:
    if (singleDif(nums).length === 2) return nums
    return weightDif([el])
  })
}

// Recursion... number two... try two XD
function weightDif (obj) {
  // if (!obj.holding) return obj.weight
  // return obj.holding.map(
  //   el =>
  //     el.weight +
  //     el.holding.reduce((acc, el) => {
  //       return acc + weightDif(el)
  //     }, 0)
  // )
  // Maybe I can just make this recurse down and add
  // That way I can just map over the first children to get this to work?
  if (!obj.holding) return obj.weight
  return (
    obj.weight +
    obj.holding.reduce((acc, el) => {
      return acc + weightDif(el)
      // el.weight +
      // el.holding.reduce((accTwo, elTwo) => {
      //   return accTwo + weightDif(elTwo)
      // }, 0)
    }, 0)
  )
}

function main (list) {
  // using findFirst gives me the base point of the tree
  let tree = findFirst(list)
  let parts = parse(list).filter(el => el.name !== tree.name)

  tree = makeStack(tree, parts)
  // console.log(tree)
  // tree.holding.map(el => console.log(el.holding))

  // console.log(weightDif(tree))
  // console.log(tree.holding.map(el => weightDif(el)))
  let branchWeights = tree.holding.map(el => weightDif(el))
  console.log(branchWeights)
  // After this I saw the 1st array part was off from the others....
  // So I guessed it +- 9 (the dif) but that didn't work. Is the problem further up?
  console.log(tree.holding[1].holding.map(el => weightDif(el))) // This one has a problem too
  console.log(tree.holding[1].holding[0].holding.map(el => weightDif(el))) // [2]
  console.log(
    tree.holding[1].holding[0].holding[2].holding.map(el => weightDif(el))
  ) // no probs here!
  // so the problem is on tree.holding[1].holding[0].holding difference of 9
  console.log(tree.holding[1].holding[0].holding[2])

  return
}

// main(example)
main(data) // answer is 1152!!

const fs = require('fs')
const data = fs.readFileSync('data.txt', 'utf-8')

const example = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`

function parse (list) {
  let lines = list.trim().split('\n')
  let sections = []
  for (let line of lines) {
    sections.push(line.split(' -> '))
  }
  let cords = []
  for (let section of sections) {
    for (let i = 0; i < section.length; i++) {
      cords.push(section[i].split(',').map(Number))
    }
  }

  const endGoal = []
  const placeHold = []
  for (let cord of cords) {
    placeHold.push(cord)
    if (placeHold.length === 2) {
      // here I first organize them in order to make graphing over them easier
      let xtemp1 = placeHold[0][0],
        ytemp1 = placeHold[0][1],
        xtemp2 = placeHold[1][0],
        ytemp2 = placeHold[1][1],
        xbig = 0,
        xsmall = 0,
        ybig = 0,
        ysmall = 0

      // 1,7 -> 7,1 ::  1,1->7,7 :: BAD
      if (xtemp1 >= xtemp2) {
        xbig = xtemp1
        xsmall = xtemp2
      } else {
        xbig = xtemp2
        xsmall = xtemp1
      }
      if (ytemp1 >= ytemp2) {
        ybig = ytemp1
        ysmall = ytemp2
      } else {
        ybig = ytemp2
        ysmall = ytemp1
      }

      endGoal.push({
        x1: xbig,
        y1: ybig,
        x2: xsmall,
        y2: ysmall
      })
      placeHold.shift()
      placeHold.shift()
    }
  }
  return endGoal
}

// need to make two arrays, one for x place and one for y place, then loop over that like a graph
// each time I hit one, I add one to it

function graph (list) {
  const cords = parse(list)
  const graph = {}
  let ymax = 0
  let xmax = 0
  let ymin = 0
  let xmin = 0
  for (let cord of cords) {
    // console.log(cord.x1, cord.x2, cord.y1, cord.y2)
    // at this point the coordinates are still the simple things they should be
    for (let x = cord.x2; x < cord.x1 + 1; x++) {
      for (let y = cord.y2; y < cord.y1 + 1; y++) {
        // ------ Somewhere over here I'm messing up ------
        // The max x and max y aren't catching the thing, so I'm getting graph['80,80'] such nonsense
        // got it, I forgot to convert my things to numbers XD
        // still not right, I'm making a square instead of a line
        if (y > ymax) ymax = y
        if (x > xmax) xmax = x
        if (y < ymin) ymin = y
        if (x < xmin) xmin = x
        if (!graph[`${x},${y}`]) {
          graph[`${x},${y}`] = { val: 1 }
        } else {
          graph[`${x},${y}`].val += 1
        }
      }
    }
  }
  console.log(graph)
  // console.log(ymax, ymin, xmax, xmin)
  return { graph, xmax, xmin, ymax, ymin }
}

function record (list) {
  const thing = graph(list)
  const thisGraph = thing.graph
  const xmax = thing.xmax
  const ymax = thing.ymax
  const xmin = thing.xmin
  const ymin = thing.ymin

  let total = 0
  for (let x = xmin; x < xmax + 1; x++) {
    for (let y = ymin; y < ymax + 1; y++) {
      // okedoke, now the issue is over here with reading Val and checking placement in thisGraph
      console.log(thisGraph[`${x},${y}`].val)
      if (thisGraph[`${x},${y}`].val > 2) {
        total += thisGraph[`${x},${y}`].val - 2
      }
    }
  }
  return total
}

console.log(record(example))

// Later on I then go over everything and add my things that are over 1 together

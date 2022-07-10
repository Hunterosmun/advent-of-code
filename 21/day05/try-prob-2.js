console.time('flipity')

const fs = require('fs')
const path = require('path')
// const data = fs.readFileSync(__dirname + path.sep + 'data.txt', 'utf-8')
const data = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
const assert = require('assert')

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

      if (xtemp1 === xtemp2 || ytemp1 === ytemp2) {
        // this is where we get the horizontal and vertical lines
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

        // at some point I could change this, so it's sending only the x and the two different y's or vice versa

        endGoal.push({
          straight: true,
          x1: xbig,
          y1: ybig,
          x2: xsmall,
          y2: ysmall
        })
      } else {
        // this is where we get the diagonal lines!
        if (xtemp1 >= xtemp2) {
          xbig = xtemp1
          ybig = ytemp1
          xsmall = xtemp2
          ysmall = ytemp2
        } else {
          xbig = xtemp2
          ybig = ytemp2
          xsmall = xtemp1
          ysmall = ytemp1
        }

        endGoal.push({
          diag: true,
          x1: xbig,
          y1: ybig,
          x2: xsmall,
          y2: ysmall
        })
      }
      placeHold.shift()
      placeHold.shift()
    }
  }
  return endGoal
}

function graph (list) {
  const cords = parse(list)
  const straightCords = []
  const diagCords = []
  for (str of cords) {
    if (str.straight) straightCords.push(str)
    else diagCords.push(str)
  }
  const graph = {}
  // going over horizontals and verticals
  for (let cord of straightCords) {
    // this party only works cause it's a straight line. It is actually set to graph over a square
    for (let x = cord.x2; x < cord.x1 + 1; x++) {
      for (let y = cord.y2; y < cord.y1 + 1; y++) {
        if (!graph[`${x},${y}`]) {
          graph[`${x},${y}`] = 1
        } else {
          graph[`${x},${y}`] += 1
        }
      }
    }
  }

  // going over diagonals
  for (let cord of diagCords) {
    // I always know that Diagonals x1 is bigger than x2
    let tx = cord.x1
    let ty = cord.y1

    let dif = Math.abs(cord.y2 - cord.y1)
    // temp x and temp y
    for (let i = 0; i < dif + 1; i++) {
      if (!graph[`${tx},${ty}`]) {
        graph[`${tx},${ty}`] = 1
      } else {
        graph[`${tx},${ty}`] += 1
      }
      tx -= 1
      if (cord.y2 > cord.y1) ty += 1
      if (cord.y2 < cord.y1) ty -= 1
    }
  }

  return graph
}

function record (list) {
  const thisGraph = graph(list)
  return Object.values(thisGraph).filter(el => el > 1).length

  // let total = 0
  // for (const value of Object.values(thisGraph)) {
  //   if (value > 1) total += 1
  // }
  // return total
}

assert.strictEqual(record(example), 12)
assert.strictEqual(record(data), 20500)

// Later on I then go over everything and add my things that are over 1 together
console.timeEnd('flipity')

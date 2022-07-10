const assert = require('assert')
const fs = require('fs')
const data = fs.readFileSync('./data.txt', 'utf-8')

const example = `
on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682
`

const smallExample = `
on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10
`

function parse (list) {
  const parsed = list.trim().split('\n')
  const regex = /^(on|off) x=(-?[0-9]+)\.\.(-?[0-9]+),y=(-?[0-9]+)\.\.(-?[0-9]+),z=(-?[0-9]+)\.\.(-?[0-9]+)$/
  const final = parsed.reduce((acc, el) => {
    const [, state, x1, x2, y1, y2, z1, z2] = el.match(regex)
    acc.push({
      state,
      x: [+x1, +x2].sort((a, b) => a - b),
      y: [+y1, +y2].sort((a, b) => a - b),
      z: [+z1, +z2].sort((a, b) => a - b)
    })
    return acc
  }, [])

  return final
}

function trimList (list) {
  return list.filter(el => {
    if (el.x[0] > 51) return
    if (el.x[1] < -51) return
    if (el.y[0] > 51) return
    if (el.y[1] < -51) return
    if (el.z[0] > 51) return
    if (el.z[1] < -51) return
    return el
  })
}

function count (list) {
  const orders = trimList(parse(list))

  let boxes = {}
  orders.map(step => {
    for (let x = step.x[0]; x < step.x[1] + 1; x++) {
      for (let y = step.y[0]; y < step.y[1] + 1; y++) {
        for (let z = step.z[0]; z < step.z[1] + 1; z++) {
          // first check if the boxes array has the thing
          // then use a ternary for if it's turning on or off ?
          const singleBox = `block: ${x} + ${y} + ${z}`
          if (step.state === 'on' && !(singleBox in boxes)) {
            boxes[`${singleBox}`] = true
          }
          if (step.state === 'off' && singleBox in boxes) {
            delete boxes[`${singleBox}`]
          }
        }
      }
    }
  })

  return Object.keys(boxes).length
}

// assert.strictEqual(count(smallExample), 39)
// assert.strictEqual(count(example), 590784)
assert.strictEqual(count(data), 609563)

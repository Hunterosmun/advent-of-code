const fs = require('fs')
const santasList = fs.readFileSync(__dirname + '/input.txt', 'utf-8')
const assert = require('assert')

const ex1 = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`

function main (input) {
  const organizedList = buildTree(input)

  return Object.keys(organizedList).reduce((acc, el) => {
    if (organizedList[el].size <= 100000) {
      return acc + organizedList[el].size
    } else {
      return acc
    }
  }, 0)
}

assert.strictEqual(main(ex1), 95437)
assert.strictEqual(main(santasList), 1423358)

function partTwo (input) {
  // Total space: 70000000
  // Needed space: 30000000
  const organizedList = buildTree(input)

  const usedSpace = 70000000 - organizedList['root'].size
  const neededSpace = 30000000 - usedSpace

  return Object.keys(organizedList)
    .filter(el => organizedList[el].size >= neededSpace)
    .map(el => organizedList[el].size)
    .sort((a, b) => a - b)
    .shift()
}

assert.strictEqual(partTwo(ex1), 24933642)
assert.strictEqual(partTwo(santasList), 545729)

function buildTree (input) {
  const organized = { root: { parent: null, files: [] } }
  let curDirectory = ['root']
  const allDirs = ['root']
  input
    .trim()
    .split('\n')
    .forEach(thing => {
      if (/\$ cd (.+)/.exec(thing)) {
        const [, changeDir] = /\$ cd (.+)/.exec(thing)
        if (changeDir === '..') {
          curDirectory.pop()
        } else if (changeDir === '/') {
          curDirectory = ['root']
        } else {
          const parent = [...curDirectory].join(',')

          curDirectory.push(changeDir)
          allDirs.push(curDirectory.join(','))
          if (!(curDirectory in organized)) {
            organized[curDirectory] = { parent, files: [] }
          }
        }
      } else if (/([0-9]+) (.+)/.exec(thing)) {
        const [, size, name] = /([0-9]+) (.+)/.exec(thing)
        organized[curDirectory].files.push({ name, size: +size })
      }
      // this would be useful if I wanted to keep track of children directories instead of who their parent is
      // if (/dir (.+)/.exec(thing)) {
      //   const [, name] = /dir (.+)/.exec(thing)
      //   organized[curDirectory.at(-1)].files.push({ name, size: 0 })
      // }
    })

  allDirs.forEach(
    key => (organized[key].size = findAllSize(key, organized, allDirs))
  )
  return organized
}

function findAllSize (key, organized, all) {
  const mySize = organized[key].files.reduce((acc, el) => acc + el.size, 0)
  const kidsSize = all
    .filter(el => organized[el].parent === key)
    .reduce((acc, el) => acc + findAllSize(el, organized, all), 0)
  return mySize + kidsSize
}

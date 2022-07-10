const fs = require('fs')
const path = require('path')

const santasList = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')
const example = `2199943210
3987894921
9856789892
8767896789
9899965678`

console.log(santasList)

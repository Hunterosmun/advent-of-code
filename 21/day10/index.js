const fs = require('fs')
const path = require('path')
const santasList = fs.readFileSync(path.join(__dirname, 'data.txt'), 'utf-8')

const example = `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`

function firstParse (list) {
  return list.trim().split('\n')
}
// corrupted lines have uneven numbers of types (end w/ the wrong one)
// incomplete lines simply don't have the thing

//   console.log(organized)
// }

firstParse(example)

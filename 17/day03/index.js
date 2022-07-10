//
// This one may be a doozy
//

// 1 = 0 steps

// 2-9 evens = 1 step
// 2-9 odds = 2 steps

// 10-25 evens = 3 steps
// 10-25 odds = 2 or 4 (every other, starts with 2, then 4)

// 26 - 49
// max is 6 moves from corner, min 3 moves from sides, 4

// 50 - 81

// 65  64  63  62  61  60  59  58  57
// 66  37  36  35  34  33  32  31  56
// 67  38  17  16  15  14  13  30  55
// 68  39  18   5   4   3  12  29  54
// 69  40  19   6   1   2  11  28  53
// 70  41  20   7   8   9  10  27  52
// 71  42  21  22  23  24  25  26  51
// 72  43  44  45  46  47  48  49  50
// 73  74  75  76  77  78  79  80  81

//1, 9, 25, 49, and 81 are important because they are corners before big new things
// each step outwards is the number of steps thus far * 8
// corners are always how many steps out they are *2

let spaces = { count: 1, step: 0 }
const goal = 361527
// const goal = 12

function step () {
  spaces.step += 1
  spaces.count += spaces.step * 8
}

function getToNum (num) {
  for (i = 1; i > 0; i++) {
    if (spaces.count < num) {
      step()
    } else {
      return spaces
    }
  }
}

function findPlace () {
  const newNum = getToNum(goal)
  let stepsAway = 0

  while (true) {
    newNum.count -= newNum.step
    stepsAway += 1
    if (newNum.count < goal) {
      break
    }
  }

  const howClose = goal - spaces.count
  if (stepsAway % 2) {
    //basically if it is odd this will trigger
    return howClose + newNum.step
  } else {
    // this will trigger if Even
    return newNum.step * 2 - howClose
  }
}

console.log(findPlace())

//max is: 363609
//step is: 302

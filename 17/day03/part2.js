//
//
//
//
//
// Yeah... so part 2 is WAY different from part 1...
//
//
//
//

// In this instance, the numbers are affected by the blocks touching them.
//

// 147  142  133  122   59
// 304    5    4    2   57
// 330   10    1    1   54
// 351   11   23   25   26
// 362  747  806--->   ...

// Whatever numbers they're touching at their creation is what they add together to get what they are
// My number was 361527 and it is my job to find what is the first number that generates larger than this monster

// 1 1 2 4 5 10 11 23 25 26 54 57 59 122 133 142 147 304 330 351 362 747 806
// n *2 *2 +1 *2 +1 *2+1 +2 +1 *2+2 +3 +2 *2+4 +11 +9
// 0 1 2 1 5 1 12 2 1
// ... what is the pattern here? Like I know it.. but I don't know how to make it into an equation

// 363010    349975   330785   312453   295229   279138   266330   130654
//   6591      6444     6155     5733     5336     5022     2450   128204
//  13486       147      142      133      122       59     2391   123363
//  14267       304        5        4        2       57     2275   116247
//  15252       330       10        1        1       54     2105   109476
//  16295       351       11       23       25       26     1968   103128
//  17008       362      747      806      880      931      957    98098
//  17370     35487    37402    39835    42452    45220    47108    48065
//

//Lookin for this: 361527
// DID IT!! OH MY GOODNESS!! UGGGGGHHH
// Still need to come up with code version

// leetcode 914. 卡牌分组
// 归类运算
// https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/
// 课程讲解 理解有问题的啊 leetcode 无法通过

// export default (arr) => {
//   if (arr.length < 2) return false
//   // 对这幅牌进行排序，升序降序都可以
//   arr.sort((a, b) => a - b)
//   let min = Number.MAX_SAFE_INTEGER
//   let dst = []
//   let result = true
//   for (let i = 0, len = arr.length, tmp = []; i < len; i++) {
//     tmp.push(arr[i])
//     for (let j = i + 1; j < len - 1; j++) {
//       if (arr[i] === arr[j]) {
//         tmp.push(arr[j])
//       } else {
//         if (min > tmp.length) {
//           min = tmp.length
//         }
//         // 核心代码
//         dst.push([].concat(tmp))
//         // 数组清空 标准 length = 0
//         tmp.length = 0
//         i = j
//       }
//     }
//   }

//   // 每个元素必须是最小元素的整数倍
//   dst.every(item => {
//     if (item.length % min !== 0) {
//       result = false
//       return false
//     }
//   })

//   return result
// }

export default (arr) => {
  // 存储每张卡牌的总数
  // 修改排序的方式修改为直接统计每个相同字符的数量，思路不变（LeetCode测试用例）
  let group = []
  let tmp = {}
  arr.forEach(item => {
    tmp[item] = tmp[item] ? tmp[item] + 1 : 1
  })
  for (let v of Object.values(tmp)) {
    group.push(v)
  }
  // 此时group已经存放的是每张牌的总数了（数组只遍历一遍，避免了排序和正则的耗时）
  // 求两个数的最大公约数
  let gcd = (a, b) => {
    if (b === 0) {
      return a
    } else {
      return gcd(b, a % b)
    }
  }
  while (group.length > 1) {
    let a = group.shift()
    let b = group.shift()
    let v = gcd(a, b)
    if (v === 1) {
      return false
    } else {
      group.unshift(v)
    }
  }
  return group.length ? group[0] > 1 : false
}

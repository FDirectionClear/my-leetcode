/**
 * 我的思路：偏向动态计算。
 */
var lemonadeChange = function (bills) {
  let wallet = [] // 我的钱包
  
  for (let i = 0, len = bills.length; i < len; i ++) {
    const bill = bills[i] // 当前顾客给的钱
    let charge = bills[i] - 5 // 还需要给顾客找的钱
    wallet.push(bill)
    wallet.sort((a, b) => a - b) // 从小达到排个序

    for (let j = wallet.length - 1; j >= 0; j --) {
      if (wallet[j] <= charge) {
        charge -= wallet[j]
        wallet = wallet.slice(0, j).concat(wallet.slice(j + 1)) // 找钱
        if (charge === 0) {
          break
        }
      }
    }
    if (charge > 0) {
      return false
    }
  }
  return true
}

/**
 * 题解思路：偏向对情况进行列举。因为只有5,10,20这三种面值，所以很容列举
 */
var lemonadeChange = function (bills) {
  let five = 0, ten = 0;
  for (const bill of bills) {
      if (bill === 5) {//面值为5 直接可以兑换柠檬水
          five += 1;
      } else if (bill === 10) {//面值为10 兑换柠檬水 还需要找5元
          if (five === 0) {
              return false;
          }
          five -= 1;
          ten += 1;
      } else {//面值为20 兑换柠檬水 需要找3个5元或一个10元一个5元
          if (five > 0 && ten > 0) {
              five -= 1;
              ten -= 1;
          } else if (five >= 3) {
              five -= 3;
          } else {
              return false;
          }
      }
  }
  return true;
};

/**
 * 使用贪心算法题解关键：该题思路的关键是找到 ”采用尽可能先挑找面值大的去找的方案，必定能正确判断钱包里的钱是否能找开顾客给的面额。“
 * 因为10元相当于两个5元的绑定。任何面额都可以被5元整除，所以找钱的时候要尽可能的先保留5元，优先使用面值更大的，这样的话后面能找钱的空间就会越多。
 * （因为大的面值找钱空间小，找10元可以用一张10元和两张5元，但找5元却不能使用10元，只能使用5元。）
 */
var bills = [5,5,10,10,20]

console.log(
  lemonadeChange(bills)
)

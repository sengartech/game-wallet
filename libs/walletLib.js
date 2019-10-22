/**
 * functtion to calculate final amount after deducting entry fee.
 * discount can be given on entry fee.
 * only 10% of the entry fee can be used from bonus amount.
 * priority to deduct money is: Bonus > Deposit > Winnings.
 * params: dataObj: object will have below data.
 *         (depositAmount, bonusAmount, winningAmount, discount, entryFee).
 * assuming we receive all numbers.
 */
let calcWalletAmount = (dataObj) => {
  console.log(`-- inside calcWalletAmount function --`);

  // calculating entry fee after applying discount.
  let entryFeeAfterDiscount = dataObj.entryFee - ((dataObj.discount / 100) * dataObj.entryFee);

  // calculating amount to be used from from bonus, which is 10% of entry fee.
  let amountToBeUsedFromBonus = (10 / 100) * entryFeeAfterDiscount;

  // this is to store remaining fee after deducting amount from bonus, deposit, winning.
  let remainingFee = entryFeeAfterDiscount;

  console.log(`entryFeeAfterDiscount: ${entryFeeAfterDiscount}`);
  console.log(`amountToBeUsedFromBonus: ${amountToBeUsedFromBonus}`);
  console.log(`remainingFee: ${remainingFee}\n`);

  // using bonus amount.
  if (dataObj.bonusAmount >= amountToBeUsedFromBonus) {
    dataObj.bonusAmount = dataObj.bonusAmount - amountToBeUsedFromBonus;
    remainingFee = remainingFee - amountToBeUsedFromBonus;
  } else {
    remainingFee = remainingFee - dataObj.bonusAmount;
    dataObj.bonusAmount = 0;
  }

  // using deposit amount.
  if (dataObj.depositAmount >= remainingFee) {
    dataObj.depositAmount = dataObj.depositAmount - remainingFee;
    remainingFee = 0;
  } else {
    remainingFee = remainingFee - dataObj.depositAmount;
    dataObj.depositAmount = 0;
  }

  // using winning amount.
  if (dataObj.winningAmount >= remainingFee) {
    dataObj.winningAmount = dataObj.winningAmount - remainingFee;
    remainingFee = 0;
  } else {
    remainingFee = remainingFee - dataObj.winningAmount;
    dataObj.winningAmount = 0;
  }

  console.log(`fee remaining after all deductions: ${remainingFee}\n`);

  // checking if remainigFee is 0 or not.
  // if its 0 that means user has enough balance to participate.
  // hence process further and return final wallet amount.
  // otherwise return null.
  if (remainingFee === 0) {
    let walletAfterJoining = {
      bonusAmount: dataObj.bonusAmount,
      depositAmount: dataObj.depositAmount,
      winningAmount: dataObj.winningAmount,
      totalAmount: dataObj.depositAmount + dataObj.bonusAmount + dataObj.winningAmount
    }
    return walletAfterJoining;
  } else {
    return null;
  }

} // end of calcWalletAmount.

// // // test our function.
// let obj = {
//   bonusAmount: 60,
//   depositAmount: 100,
//   winningAmount: 340,
//   discount: 20,
//   entryFee: 400
// }

// console.log(`test running our calcWalletAmount function.`);
// console.log(`wallet after joining contest:\n`, calcWalletAmount(obj));

module.exports = {
  calcWalletAmount
}

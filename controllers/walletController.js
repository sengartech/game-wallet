/**
 * importing moules.
 */
let mongoose = require('mongoose');

let WalletModel = mongoose.model('WalletModel');

/**
 * controllers function to get all wallets.
 * params:
 */
let getAllWallets = (req, res) => {
  console.log(`-- inside getAllWallets function --`);

  WalletModel.find({})
    .exec((err, result) => {
      if (err) {
        console.log(`error occurred: ${err}`);
        res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
      } else {
        console.log(`wallet list found.`);
        res.status(200).send({ error: false, message: `wallet list found.`, data: result });
      }
    })
} // end of the getAllWallets function.

/**
 * function to setup wallet.
 * required params: userId. 
 * optional params: depositAmount, bonusAmount, winningAmount.
 */
let setupWallet = (req, res) => {
  console.log('-- inside setupWallet function --');
  if (!req.body.userId) {
    console.log('please provide unique userId.');
    res.status(400).send({ error: true, message: `please provide unique userId.`, data: null });
  } else {
    let depositAmount = Number(req.body.depositAmount) || 0;
    let bonusAmount = Number(req.body.bonusAmount) || 0;
    let winningAmount = Number(req.body.winningAmount) || 0;
    let totalAmount = depositAmount + bonusAmount + winningAmount;

    let newWallet = new WalletModel({
      userId: req.body.userId,
      depositAmount,
      bonusAmount,
      winningAmount,
      totalAmount,
    })

    newWallet.save((err, result) => {
      if (err) {
        console.log(`error occurred: ${err}`);
        res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
      } else {
        console.log(`wallet created.`);
        res.status(200).send({ error: false, message: `wallet created.`, data: result });
      }
    })
  }
} // end of the setupWallet function.

/**
 * function to update wallet.
 * required params: userId. 
 * optional params: depositAmount, bonusAmount, winningAmount.
 */
let updateWallet = (req, res) => {
  console.log('-- inside updateWallet function --');
  if (!req.body.userId) {
    console.log('please provide unique userId.');
    res.status(400).send({ error: true, message: `please provide unique userId.`, data: null });
  } else if (!req.body.depositAmount && !req.body.bonusAmount && !req.body.winningAmount) {
    console.log('no data provided to update.');
    res.status(400).send({ error: true, message: `no data provided to update.`, data: null });
  } else {
    let findQuery = {
      userId: req.body.userId
    }

    WalletModel.findOne(findQuery)
      .exec((err, walletInfo) => {
        if (err) {
          console.log(`error occurred: ${err}`);
          res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
        } else if (!walletInfo) {
          console.log(`no wallet found for the given userId.`);
          res.status(400).send({ error: true, message: `no wallet found for the given userId.`, data: null });
        } else {
          console.log(`wallet found updating...`);

          let depositAmount = req.body.depositAmount ? Number(req.body.depositAmount) : walletInfo.depositAmount;
          let bonusAmount = req.body.bonusAmount ? Number(req.body.bonusAmount) : walletInfo.bonusAmount;
          let winningAmount = req.body.winningAmount ? Number(req.body.winningAmount) : walletInfo.winningAmount;
          let totalAmount = depositAmount + bonusAmount + winningAmount;

          walletInfo.depositAmount = depositAmount;
          walletInfo.bonusAmount = bonusAmount;
          walletInfo.winningAmount = winningAmount;
          walletInfo.totalAmount = totalAmount;

          walletInfo.modifiedOn = Date.now();

          walletInfo.save((err, updatedWallet) => {
            if (err) res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
            else res.status(200).send({ error: false, message: `wallet updated.`, data: updatedWallet });
          })
        } // end else.
      })
  }
} // end of the updateWallet function.

/**
 * exporting controller function.
 */
module.exports = {
  getAllWallets,
  setupWallet,
  updateWallet
}

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
        console.log(`error occurred: ${err}`)
        res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
      } else {
        console.log(`wallet list found.`)
        res.status(200).send({ error: false, message: `wallet list found.`, data: result });
      }
    })
} // end of the getAllWallets function.


/**
 * exporting controller function.
 */
module.exports = {
  getAllWallets
}

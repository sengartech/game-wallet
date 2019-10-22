/**
 * importing moules.
 */
let mongoose = require('mongoose');
let walletLib = require('../libs/walletLib.js');

let ContestModel = mongoose.model('ContestModel');
let WalletModel = mongoose.model('WalletModel');

/**
 * controllers function to get all contests.
 * params:
 */
let getAllContests = (req, res) => {
  console.log(`-- inside getAllContests function --`);

  ContestModel.find({})
    .exec((err, result) => {
      if (err) {
        console.log(`error occurred: ${err}`);
        res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
      } else {
        console.log(`contest list found.`);
        res.status(200).send({ error: false, message: `contest list found.`, data: result });
      }
    })
} // end of the getAllContests function.

/**
 * function to create contest.
 * required params: contestId.
 * optional params: displayName, entryFee.
 */
let createContest = (req, res) => {
  console.log('-- inside createContest function --');
  if (!req.body.contestId) {
    console.log('please provide unique contestId.');
    res.status(400).send({ error: true, message: `please provide unique contestId.`, data: null });
  } else {
    let newContest = new ContestModel({
      contestId: req.body.contestId,
      displayName: req.body.displayName || '',
      entryFee: Number(req.body.entryFee) || 100 // lets set default fee to 100.
    })

    newContest.save((err, result) => {
      if (err) {
        console.log(`error occurred: ${err}`);
        res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
      } else {
        console.log(`contest created.`);
        res.status(200).send({ error: false, message: `contest created.`, data: result });
      }
    })
  }
} // end of the createContest function.

/**
 * function to update contest.
 * required params: contestId.
 * optional params: displayName, entryFee.
 */
let updateContest = (req, res) => {
  console.log('-- inside updateContest function --');
  if (!req.body.contestId) {
    console.log('please provide unique contestId.');
    res.status(400).send({ error: true, message: `please provide unique contestId.`, data: null });
  } else if (!req.body.displayName && !req.body.entryFee) {
    console.log('no data provided to update.');
    res.status(400).send({ error: true, message: `no data provided to update.`, data: null });
  } else {
    let findQuery = {
      contestId: req.body.contestId
    }

    ContestModel.findOne(findQuery)
      .exec((err, contestInfo) => {
        if (err) {
          console.log(`error occurred: ${err}`);
          res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
        } else if (!contestInfo) {
          console.log(`no contest found for the given contestId.`);
          res.status(400).send({ error: true, message: `no contest found for the given contestId.`, data: null });
        } else {
          console.log(`contest found updating...`);

          contestInfo.displayName = req.body.displayName || contestInfo.displayName
          contestInfo.entryFee = req.body.entryFee ? Number(req.body.entryFee) : contestInfo.entryFee;

          contestInfo.modifiedOn = Date.now();

          contestInfo.save((err, updatedContest) => {
            if (err) res.status(500).send({ error: true, message: `error occurred: ${err.message}`, data: null });
            else res.status(200).send({ error: false, message: `contest updated.`, data: updatedContest });
          })
        } // end else.
      })
  }
} // end of the updateContest function.

/**
 * function to join contest.
 * required params: userId, contestId.
 * optional params: discount.
 */
let joinContest = (req, res) => {
  console.log(`-- inside joinContest function --`);
  // function to check body params.
  let checkParams = () => {
    return new Promise((resolve, reject) => {
      if (!req.body.contestId || !req.body.userId) {
        console.log('parameters missing.');
        let info = { error: true, status: 400, message: `parameters missing.`, data: null }
        reject(info);
      } else {
        resolve();
      }
    })
  } // end of the checkParams.

  // function to get user wallet.
  let getWallet = () => {
    return new Promise((resolve, reject) => {
      console.log(`-- inside getWallet function --`);
      let findQuery = {
        userId: req.body.userId
      }

      WalletModel.findOne(findQuery)
        .exec((err, walletInfo) => {
          if (err) {
            console.log(`error occurred: ${err}`);
            let info = { error: true, status: 500, message: `error occurred: ${err.message}`, data: null }
            reject(info);
          } else if (!walletInfo) {
            console.log(`no wallet found for the given userId.`);
            let info = { error: true, status: 400, message: `no wallet found for the given userId.`, data: null }
            reject(info);
          } else {
            console.log(`wallet found.`);
            resolve(walletInfo);
          } // end else.
        })
    })
  } // end of the getWallet function.

  // function to get contest and modify wallet after joining.
  let getContestAndModifyWallet = (walletInfo) => {
    return new Promise((resolve, reject) => {
      let findQuery = {
        contestId: req.body.contestId
      }

      ContestModel.findOne(findQuery)
        .exec((err, contestInfo) => {
          if (err) {
            console.log(`error occurred: ${err}`);
            let info = { error: true, status: 500, message: `error occurred: ${err.message}`, data: null }
            reject(info);
          } else if (!contestInfo) {
            console.log(`no contest found for the given contestId.`);
            let info = { error: true, status: 400, message: `no contest found for the given contestId.`, data: null }
            reject(info);
          } else {
            console.log(`contest found.`);

            // preparing object to call calcWalletAmount function.
            // it will calculate wallet after joining if there is sufficent balance.
            let dataObj = {
              bonusAmount: walletInfo.bonusAmount,
              depositAmount: walletInfo.depositAmount,
              winningAmount: walletInfo.winningAmount,
              entryFee: contestInfo.entryFee,
              discount: (Number(req.body.discount) >= 0) ? Number(req.body.discount) : 0
            }

            let walletAfterJoining = walletLib.calcWalletAmount(dataObj);

            console.log('wallet after joining contest:\n', walletAfterJoining);

            if (walletAfterJoining) {
              // updating wallet.
              console.log(`updating wallet...`);
              walletInfo.depositAmount = walletAfterJoining.depositAmount;
              walletInfo.bonusAmount = walletAfterJoining.bonusAmount;
              walletInfo.winningAmount = walletAfterJoining.winningAmount;
              walletInfo.totalAmount = walletAfterJoining.totalAmount;

              walletInfo.modifiedOn = Date.now();

              walletInfo.save((err, updatedWallet) => {
                if (err) {
                  console.log(`error occurred: ${err}`);
                  let info = { error: true, status: 500, message: `error occurred: ${err.message}`, data: null }
                  reject(info);
                } else {
                  console.log(`contest joined and wallet updated.`);
                  let info = { error: false, status: 200, message: `contest joined and wallet updated.`, data: updatedWallet }
                  resolve(info);
                }
              })
            } else {
              // insufficient balance.
              let info = { error: true, status: 400, message: `have insufficient balance.`, data: walletInfo }
              reject(info);
            }
          } // end else.
        })
    })
  } // end of the getContestAndModifyWallet function.

  // making promise call.
  checkParams()
    .then(getWallet)
    .then(getContestAndModifyWallet)
    .then((result) => {
      res.status(result.status).send(result);
    })
    .catch((error) => {
      console.log(error);
      if (error.status) res.status(error.status).send(error);
      else res.send(error);
    })
} // end of the joinContest function.

/**
 * exporting controller function.
 */
module.exports = {
  getAllContests,
  createContest,
  updateContest,
  joinContest
}

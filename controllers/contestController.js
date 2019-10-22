/**
 * importing moules.
 */
let mongoose = require('mongoose');

let ContestModel = mongoose.model('ContestModel');

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
 * exporting controller function.
 */
module.exports = {
  getAllContests,
  createContest,
  updateContest
}

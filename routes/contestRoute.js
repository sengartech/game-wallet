/**
 * importing files.
 */
let contestController = require('../controllers/contestController.js');

module.exports.routers = (app) => {
  // define all routes here.

  app.get('/contest/get/all', contestController.getAllContests);

  // required params: contestId.
  // optional params: displayName, entryFee.
  app.post('/contest/create', contestController.createContest);

  // required params: contestId.
  // optional params: displayName, entryFee.
  app.put('/contest/update', contestController.updateContest);

  // required params: userId, contestId.
  // optional params: discount.
  app.put('/contest/join', contestController.joinContest);

} // end of router.

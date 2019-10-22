/**
 * importing files.
 */
let walletController = require('../controllers/walletController.js');

module.exports.routers = (app) => {
  // define all routes here.

  app.get('/wallet/get/all', walletController.getAllWallets);

  // required params: userId.
  // optional params: depositAmount, bonusAmount, winningAmount.
  app.post('/wallet/setup', walletController.setupWallet);

  // required params: userId.
  // optional params: depositAmount, bonusAmount, winningAmount.
  app.put('/wallet/update', walletController.updateWallet);

} // end of router.

/**
 * importing files.
 */
let walletController = require('../controllers/walletController.js');

module.exports.routers = (app) => {
  // define all routes here.

  app.get('/wallet/get/all', walletController.getAllWallets);
} // end of router.

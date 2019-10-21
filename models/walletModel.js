/**
 * importing modules.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let walletSchema = new Schema({
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true,
    unique: true
  }, // user id to whom this wallet belongs.
  depositAmount: {
    type: Number,
    default: 0
  },
  bonusAmount: {
    type: Number,
    default: 0
  },
  winningAmount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  }
})

mongoose.model('WalletModel', walletSchema);

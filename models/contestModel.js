/**
 * importing modules.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let contestSchema = new Schema({
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  },
  contestUniqueName: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    default: ''
  },
  entryFee: {
    type: Number,
    default: 100
  }
  // we can also add more fields like: prizeMoney, maxAllowedParticipants, etc.
  // in our case "entryFee" is mainly required.
})

mongoose.model('ContestModel', contestSchema);

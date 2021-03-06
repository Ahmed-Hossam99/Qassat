const Base = require('./base');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const partnerSchema = new Schema({

  receivedAmount: {
    type: String,
  },
  retioInCapital: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
})

module.exports = mongoose.model('Partners', partnerSchema, 'Partners');

const Base = require('./base');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const companySchema = new Schema({

  logo: {
    type: String,
  },
  powers: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
})


module.exports = mongoose.model('Companies', companySchema, 'Companies');

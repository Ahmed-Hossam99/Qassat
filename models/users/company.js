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
})


module.exports = mongoose.model('Companies', companySchema, 'Companies');

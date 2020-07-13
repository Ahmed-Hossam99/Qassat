const Base = require('./base');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const adminSchema = new Schema({

  email: {
    type: String,
  },
})

module.exports = mongoose.model('Admin', adminSchema, 'Admin');
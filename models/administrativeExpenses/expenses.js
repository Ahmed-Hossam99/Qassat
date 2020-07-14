const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const departmentSchema = new Schema({

  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  notes: {
    type: String,
    required: true

  }


}, { timestamps: true })

module.exports = mongoose.model('Departments', departmentSchema, 'Departments');

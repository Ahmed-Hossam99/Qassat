const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
  }


}, { timestamps: true })

module.exports = mongoose.model('Departments', departmentSchema, 'Departments');

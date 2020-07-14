const mongoose = require('mongoose');
const { values } = require('lodash');
const Schema = mongoose.Schema;

const remainMonthSchema = new Schema({
  month: {
    typr: Date
  },
  value: {
    type: Number
  },
  status: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Clients'
  },
  delegate: {
    type: Schema.Types.ObjectId,
    ref: 'Delegates'
  }
}, { timestamps: true })

module.exports = mongoose.model('Remaining_MonthS', remainMonthSchema, 'Remaining_MonthS');

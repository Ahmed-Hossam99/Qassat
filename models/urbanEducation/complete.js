const mongoose = require('mongoose');
const { values } = require('lodash');
const Schema = mongoose.Schema;

const completeMonthSchema = new Schema({
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

module.exports = mongoose.model('Complete_MonthS', completeMonthSchema, 'Complete_MonthS');

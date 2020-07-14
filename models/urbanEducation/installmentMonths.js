const mongoose = require('mongoose');
const { values } = require('lodash');
const Schema = mongoose.Schema;

const installmentMonthsSchema = new Schema({
  month: {
    typr: Date
  },
  value: {
    type: Number
  },
  status: {
    type: String,
    enum: ['paied', 'relay', 'new'],
    defult: 'new'
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

module.exports = mongoose.model('INstallment_Month', installmentMonthsSchema, 'INstallment_Month');

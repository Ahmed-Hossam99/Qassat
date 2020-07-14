const Base = require('./base');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const delegateSchema = new Schema({

  email: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
})

module.exports = mongoose.model('Delegates', delegateSchema, 'Delegates');

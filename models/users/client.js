const Base = require('./base');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const clientSchema = new Schema({
  favorite: [{
  }],
  code: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },

  guarantor: {
    guarantoreName: {
      type: String,
    },
    guarantoreProfile: {
      type: String,

    },
    guarantorePhone: {
      type: String,
    },
    guarantorePhone2: {
      type: String,
    },
    guarantoreNotes: {
      type: String,
    },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },

})


module.exports = mongoose.model('Clients', clientSchema, 'Clients');

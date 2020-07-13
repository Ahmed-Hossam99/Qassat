const Base = require('./base');
const mongoose = require('mongoose')
const client = Base.discriminator('client', new mongoose.Schema({
  favorite: [{

  }],
  code: {
    type: String,
  },
  resetCode: {
    type: String,
  },
  restCodeExpiration: {
    type: Date
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
  }

}),
);

module.exports = mongoose.model('client');
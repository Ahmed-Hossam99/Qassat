const Base = require('./base');
const mongoose = require('mongoose')


const delegate = Base.discriminator('delegate', new mongoose.Schema({

  email: {
    type: String,
  },
}),
);

module.exports = mongoose.model('delegate');
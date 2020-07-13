const Base = require('./base');
const mongoose = require('mongoose')


const admin = Base.discriminator('admin', new mongoose.Schema({

  email: {
    type: String,
  },
}),
);

module.exports = mongoose.model('admin');
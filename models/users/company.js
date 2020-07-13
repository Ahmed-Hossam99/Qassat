const Base = require('./base');
const mongoose = require('mongoose')


const company = Base.discriminator('company', new mongoose.Schema({

  logo: {
    type: String,
  },
  powers: {
    type: String,
  },
}),
);

module.exports = mongoose.model('company');
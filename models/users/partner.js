const Base = require('./base');
const mongoose = require('mongoose')


const partner = Base.discriminator('partner', new mongoose.Schema({

  receivedAmount: {
    type: String,
  },
  retioInCapital: {
    type: String,
  },
}),
);

module.exports = mongoose.model('partner');
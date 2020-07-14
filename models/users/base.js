
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
// const baseOptions = {
//   discriminatorKey: 'role',
// }
const userSchema = new Schema({
  type: {
    type: String,
    enum: ['admin', 'delegate', 'client', 'partner', 'company']

  },
  name: {
    type: String,

  },
  password: {
    type: String,

  },
  phone: {
    type: String,

  },
  nationalId: {
    type: String,

  },
  profile: {
    type: String,
    default: 'http://res.cloudinary.com/hossam99/image/upload/v1590711432/ayt1a5vvmcscteltalbr.webp'
  },
  governorat: {
    type: String,

  },
  address: {
    type: String,
  },
  notes: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "Admin"
  },

  delegate: {
    type: Schema.Types.ObjectId,
    ref: "Delegates"
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Clients"
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Companies"
  },
  partner: {
    type: Schema.Types.ObjectId,
    ref: "Partners"
  },
  resetCode: {
    type: String,
  },
  restCodeExpiration: {
    type: Date
  },
}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema, 'Users');
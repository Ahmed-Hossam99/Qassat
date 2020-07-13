
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
// const baseOptions = {
//   discriminatorKey: 'role',
// }
const userSchema = new Schema({
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
}, { timestamps: true, discriminatorKey: "role" });


// this function fired automatically when user signup pefore user's save to encrypt password
// userSchema.pre('save', async function (next) {
//   try {
//     // Generate a salt
//     // 10 here = saltRonds => that take original password and addto this some random string before is gone to hash to protect it from (hash dictionary table)  
//     const salt = await bcrypt.genSalt(10);
//     // Generate a password hash (salt + hash)
//     const passwordHash = await bcrypt.hash(this.password, salt);
//     // Re-assign hashed version over original, plain text password
//     console.log(this.password)
//     this.password = passwordHash;
//     console.log(passwordHash)
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model('Users', userSchema, 'Users');
const userModel = require('../../models/users/base')
const userAdminModel = require('../../models/users/admin')
const userClientModel = require('../../models/users/client')
const userCompanyModel = require('../../models/users/company')
const userPartnerModel = require('../../models/users/partner')
const userdelegateModel = require('../../models/users/delegate')
const bcrypt = require('bcrypt')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const cloud = require('../../services/cloudinary')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();
const { match } = require('assert')
const { header } = require('express-validator')
require('dotenv').config()


signToken = user => {
  return jwt.sign({
    user_id: user.id,
    user_email: user.email,
    expiresIn: "1h",
  }, process.env.JWT_SECRET);
}


exports.postSignup = async (req, res, next) => {
  try {
    console.log('here')
    const phone = req.body.phone
    const nationalId = req.body.nationalId
    // feach user role = 'client' and (nationalId or Phone)
    let matchQuery = { $and: [{ "role": "client" }, { $or: [{ "nationalId": nationalId }, { "phone": phone }] }] }
    const user = await userModel.find(matchQuery)
    if (user.length >= 1) {
      console.log(user.role)
      return res.status(409).json({//409 mean reject req with sourced we have like this case existed email
        message: 'user exist'
      })
    }
    // create New User
    let result
    if (req.file) {
      console.log('one file')
      result = await cloud.uploads(req.file.path)
      console.log(result)
      fs.unlinkSync(req.file.path)
    }
    // hash Password
    const salt = await bcrypt.genSalt(10);
    //  Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    req.body.password = passwordHash;
    // set some static data 
    req.body.role = 'client';
    req.body.profile = result === undefined ? 'http://res.cloudinary.com/hossam99/image/upload/v1590712258/zcv2aan8gufzbrfjfwc6.webp' : result.url
    const newUser = new userClientModel(req.body);

    const code = generator.generateCodes('#+#+#', 100)[0];
    newUser.code = code
    await newUser.save()
    await client.messages
      .create({
        body: ` active email code is ${code}`,
        from: '+18146193821',
        to: `+20${newUser.phone}`
      })
    res.status(201).json({
      message: 'user created',
      newUser
    })
  } catch (error) {
    console.log(error)
    res.json({ error })

  }
}

exports.activeEmail = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await userModel.findById(userId)
    if (user.code.toString() === req.body.code.toString()) {
      user.confirmed = true
      await user.save()
      return res.status(201).json({ message: 'your  email is active ' })
    }
    res.status(401).json({ message: 'code not valied' })

  } catch (error) {
    console.log(error)
    res.json(error)
  }
}

exports.secret = async (req, res, next) => {
  res.json({
    msg: "Welcome from Auth",
    user: req.user
  })
}

// // esxports.signUp = async (req, res, next) => {
//   try {

//     let newUser
//     const user = await userModel.findOne({ email: req.body.email })
//     console.log(user)

//     if (user) {
//       console.log(user.email)
//       return res.status(403).json({ // 403 meaning forbidden req because user exist
//         message: 'email already exist !!'
//       })
//     }

//     let result
//     if (req.file) {
//       console.log('one file')
//       result = await cloud.uploads(req.file.path)
//       console.log(result)
//       fs.unlinkSync(req.file.path)
//     }
//     req.body.profile = result === undefined ? 'http://res.cloudinary.com/hossam99/image/upload/v1590712258/zcv2aan8gufzbrfjfwc6.webp' : result.url
//     if (req.body.role == 'admin') {

//       newUser = new userAdminModel(req.body)
//     }
//     if (req.body.role == 'admin') {

//       newUser = new userAdminModel(req.body)
//     }
//     if (req.body.role == 'admin') {

//       newUser = new userAdminModel(req.body)
//     }
//     if (req.body.role == 'admin') {

//       newUser = new userAdminModel(req.body)
//     }
//     if (req.body.role == 'admin') {

//       newUser = new userAdminModel(req.body)
//     }
//     console.log(req.body)
//     console.log(newUser)

//     console.log('here!!')
//     await newUser.save();

//     const token = signToken(newUser);
//     res.status(201).json({
//       newUser,
//       token,
//     })

//   } catch (error) {
//     console.log(error)

//     res.json({ error })
//   }
// }
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
    expiresIn: "1h",
  }, process.env.JWT_SECRET);
}


exports.signIn = async (req, res, next) => {
  // validation done from passport file 
  const token = signToken(req.user)
  res.status(200).json({ token })
}

exports.postLogin = async (req, res, next) => {
  try {
    const nationalId = req.body.email
    const phone = req.body.email
    let matchQuery = { $and: [{ "confirmed": true }, { $or: [{ "nationalId": nationalId }, { "phone": phone }] }] }
    const existUser = await userModel.find(matchQuery)
    console.log(existUser)
    // console.log(existUser[0].password)
    if (existUser.length < 1) {
      return res.status(401).json({//401 to un Auth status
        message: 'Auth failed'
      })
    }

    const isMatch = await bcrypt.compare(req.body.password, existUser[0].password)
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({//401 to un Auth status
        message: 'Auth failed wrong password !!'
      })
    }
    const token = signToken(existUser[0])
    res.status(200).json({ token })

  } catch (error) {
    console.log(error)
    res.json({ error })
  }

}


exports.resetCode = async (req, res, next) => {
  try {
    const phone = req.body.phone
    const user = await userModel.findOne({ phone })
    if (!user) {
      return res.status(404).json({ message: 'user not found!!' })
    }
    // generate code to reset password
    const code = generator.generateCodes('#+#+#', 100)[0];
    user.resetCode = code
    user.restCodeExpiration = Date.now() + 3600000;
    await user.save()
    await client.messages
      .create({
        body: ` reset password code is ${code}`,
        from: '+18146193821',
        to: `+20${user.phone}`
      })
    console.log(code)
    res.status(201).json({ message: 'Done Code is sent!!' })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }

}

exports.resetPassword = async (req, res, next) => {
  try {
    const phone = req.body.phone
    const resetUser = await userModel.findOne({ phone })
    if (!resetUser) {
      return res.status(404).json({ message: 'user not found!! ' })
    }

    if (resetUser.resetCode.toString() !== req.body.code) {
      return res.json(401).json({ message: 'invalied code !!' })
    }

    const salt = await bcrypt.genSalt(10);
    //  Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(req.body.newPassword, salt);
    resetUser.password = passwordHash;
    resetUser.resetToken = null
    resetTokenExpiration = Date.now()
    await resetUser.save();
    res.status(201).json({ message: 'password updated!!' })
  }
  catch (error) {
    console.log(error)
    res.json({ error })
  }
}
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
const { match } = require('assert')
const { header } = require('express-validator')
require('dotenv').config()


exports.createDelegate = async (req, res, next) => {
  try {
    const phone = req.body.phone
    const nationalId = req.body.nationalId
    let matchQuery = { $and: [{ "role": "delegate" }, { $or: [{ "nationalId": nationalId }, { "phone": phone }] }] }

    const existDelegate = await userModel.findOne(matchQuery)
    if (existCompany) {
      return res.status(409).json({ message: 'delegate exist!!' })
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
    req.body.role = 'delegate';
    req.body.profile = result === undefined ? 'http://res.cloudinary.com/hossam99/image/upload/v1590712258/zcv2aan8gufzbrfjfwc6.webp' : result.url
    const newDelegate = new userdelegateModel(req.body);
    await newDelegate.save();
    res.status(201).json({ newDelegate })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.getSingleDelegate = async (req, res, next) => {
  try {
    const delegateId = req.params.delegateId
    const deledate = await userModel.findById({ _id: delegateId })
    res.status(200).json({ message: 'done !!', deledate })

  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.getAllDelegate = async (req, res, next) => {
  try {
    // const delegateId = req.params.delegateId
    const deledates = await userModel.find({ role: 'delegate' })
    if (deledates.length <= 0) {
      return res.status(200).json({ message: 'No Delegates Added!!' })
    }
    res.status(200).json({ message: 'done !!', deledates })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.getBysearch = async (req, res, next) => {
  try {
    const data = req.body.name
    const users = await userModel.find(data)

    if (users.length <= 0) {
      return res.status(200).json({ message: `no user for this${data}` })
    }
    res.status(200).json({ message: 'done', users })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.updateDelegatePassword = async (req, res, next) => {
  try {
    const delegateId = req.params.delegateId
    const delegate = await userModel.findById(delegateId)
    const isMatch = await bcrypt.compare(req.body.currentPaasword, delegate.password)
    if (!isMatch) {
      return res.status(401).json({//401 to un Auth status
        message: 'Auth failed wrong password !!'
      })
    }
    if (req.body.newPassword.toString() !== req.body.repeateNewPassword) {
      return res.json(422).json({ message: 'password is not match !!' })
    }
    const salt = await bcrypt.genSalt(10);
    //  Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(req.body.newPassword, salt);
    delegate.password = passwordHash;
    await delegate.save();
    res.status(200).json({ message: 'password updated' })

  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.updateDelegateProfile = async (req, res, next) => {
  try {
    const delegateId = req.params.delegateId
    const delegate = await userModel.findById(delegateId)
    let result
    result = await cloud.uploads(req.file.path)
    console.log(result)
    fs.unlinkSync(req.file.path)
    delegate.profile = result.url
    await delegate.save();
    res.status(201).json({ message: 'profile updated!!' })


  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.updateNameDelegate = async (req, res, next) => {
  try {
    const delegateId = req.params.delegateId
    const delegate = await userModel.findById(delegateId)

    delegate.name = req.body.name
    await delegate.save();
    res.status(200).json({ message: 'done name is updated !!' })

  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

exports.removeDelegate = async () => {
  try {
    const delegateId = req.params.delegateId
    const deledate = await userModel.findByIdAndDelete({ _id: delegateId })
    res.status(200).json({ message: 'done deleage is deleted  !!', })

  } catch (error) {
    console.log(error)
    res.json({ error })
  }

}


exports.updateDelegate = async (req, res, next) => {
  try {
    const delegateId = req.params.delegateId
    const delegate = await userModel.findById(delegateId)
    // if req has update password 
    let passwordHash
    if (req.body.newPassword) {
      const isMatch = await bcrypt.compare(req.body.currentPaasword, delegate.password)
      if (!isMatch) {
        return res.status(401).json({//401 to un Auth status
          message: 'Auth failed wrong password !!'
        })
      }
      if (req.body.newPassword.toString() !== req.body.repeateNewPassword) {
        return res.json(422).json({ message: 'password is not match !!' })
      }
      const salt = await bcrypt.genSalt(10);
      //  Generate a password hash (salt + hash)
      passwordHash = await bcrypt.hash(req.body.newPassword, salt);
    }
    req.body.newPassword = passwordHash;
    // ===========================================================
    // if req has update profile 
    let result
    if (req.file) {
      result = await cloud.uploads(req.file.path)
      console.log(result)
      fs.unlinkSync(req.file.path)
    }
    req.body.profile = result.url
    await delegate.set(req.body).save();

  } catch (error) {
    console.log(error)
    res.json({ error })
  }

}
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


exports.createCompany = async (req, res, next) => {
  try {
    const existCompany = await userCompanyModel.findOne({ nationalId: req.body.nationalId })
    if (existCompany) {
      return res.status(409).json({ message: 'company exist!!' })
    }


  } catch (error) {

  }
}
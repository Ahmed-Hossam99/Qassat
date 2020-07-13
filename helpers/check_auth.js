const jwt = require('jsonwebtoken')
const userModel = require('../models/users/base')
require('dotenv').config()


module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log('token : ' + ' ' + token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    const user = await userModel.findById(decoded.user_id)
    // console.log(user)
    req.user = user;
    next();
  }
  catch (err) {
    return res.status(401).json({
      message: 'Auth failed !!'
    })
  }

}
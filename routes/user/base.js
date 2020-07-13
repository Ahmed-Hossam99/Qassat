const express = require('express');
const router = express.Router();
const { multerConfigImage } = require('../../services/multer')
const { signinValidationRules, signupValidationRules, validate } = require('../../helpers/validation')
const checkAuth = require('../../helpers/check_auth')
const baseController = require('../../controllers/users/base')
const { model } = require('../../models/users/base');
const passport = require('passport')
require('../../helpers/passport')


const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// Post Route to signin function 
router.route('/signin').post(baseController.postLogin)

router.route('/reset/code').post(baseController.resetCode)

router.route('/password/reset').post(baseController.resetPassword)



module.exports = router
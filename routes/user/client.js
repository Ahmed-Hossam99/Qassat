const express = require('express');
const router = express.Router();
const { multerConfigImage } = require('../../services/multer')
const { signinValidationRules, signupValidationRules, validate } = require('../../helpers/validation')
const userController = require('../../controllers/users/client')
const { model } = require('../../models/users/base');
const passport = require('passport')
require('../../helpers/passport')


const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup').post(multerConfigImage, userController.postSignup)

router.route('/active/email/:userId').post(userController.activeEmail)

router.route('/secret').get(passportJWT, userController.secret)


module.exports = router
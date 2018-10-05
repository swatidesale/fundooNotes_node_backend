var express = require('express');
const expressValidator = require('express-validator');

var router = express.Router();
router.use(expressValidator());

const userController = require('../../controllers/userController');

router.post('/register',userController.createUser);
router.post('/login',userController.login);
// router.post('/forgot',userServices.forgotPassword);
// router.post('/reset/:token',userServices.resetPassword);

module.exports = router;


var express = require('express');
const expressValidator = require('express-validator');

var router = express.Router();
router.use(expressValidator());

const userController = require('../../controllers/userController');

router.post('/register',userController.signUp);
router.post('/login',userController.signIn);
router.post('/forgot',userController.forgotPassword);
// router.put('/register/:id',userController.update);
// router.post('/reset/:token',userServices.resetPassword);

module.exports = router;


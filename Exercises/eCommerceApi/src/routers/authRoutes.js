const express=require('express');
const { login,signup } = require('../controllers/userAuthController');
const validation = require('../middleware/validationMiddleware');
const { loginuserSchema, createUserSchema } = require('../../Validations/userValidations');
const router=express.Router();


router.route('/auth/login').post(validation(loginuserSchema),login);
router.route('/auth/signup').post(validation(createUserSchema),signup);

module.exports=router;
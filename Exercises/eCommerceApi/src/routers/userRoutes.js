const express=require('express');
const router=express.Router();
const { root, getAllUsers, getUserById, updateUserById } = require('../controllers/userController');
const authMiddleware=require('../middleware/authMiddleware');
const authorizeUser=require('../middleware/authorizeUser');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const { createUserSchema, updateUserSchema } = require('../Validations/userValidations');
const validation = require('../middleware/validationMiddleware');


router.route('/users').get(authorizeAdmin,getAllUsers)

router.route('/users/profile').get(authMiddleware,getUserById)

router.route('/users/profile').put(authMiddleware,validation(updateUserSchema),updateUserById);   
    
module.exports=router;
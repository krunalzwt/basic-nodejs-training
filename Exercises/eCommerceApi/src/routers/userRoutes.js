const express=require('express');
const router=express.Router();
const { getAllUsers, getUserById, updateUserById } = require('../controllers/userController');
const authMiddleware=require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const { updateUserSchema } = require('../Validations/userValidations');
const validation = require('../middleware/validationMiddleware');


router.route('/users').get(authorizeAdmin,getAllUsers)

router.route('/users/profile').get(authMiddleware,authMiddleware,getUserById).patch(authMiddleware,validation(updateUserSchema),updateUserById);
 
    
module.exports=router;
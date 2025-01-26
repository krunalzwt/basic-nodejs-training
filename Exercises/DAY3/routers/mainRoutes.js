const express=require('express');
const router=express.Router();
const {root,getAllUsers,getUserById,createUser,updateUserById,deleteUser}=require('../controllers/userController');
const idValidation = require('../middleware/idValid');
const createUserValidations = require('../middleware/createUserValidations');


router.route('/').get(root);
router.route('/users').get(getAllUsers).post(createUserValidations,createUser);
router.route('/users/:id').get(idValidation,getUserById).patch(idValidation,createUserValidations,updateUserById).delete(idValidation,deleteUser);

module.exports=router;
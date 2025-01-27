const express=require('express');
const router=express.Router();
const {root,getAllUsers,getUserById,createUser,updateUserById,deleteUser, uploadImg}=require('../controllers/userController');
const idValidation = require('../middleware/idValid');
const createUserValidations = require('../middleware/createUserValidations');
const { upload } = require('../controllers/userController'); // Adjust the path to userController



router.route('/').get(root);
router.route('/users').get(getAllUsers).post(createUserValidations,createUser);
router.route('/users/:id').get(idValidation,getUserById).patch(idValidation,createUserValidations,updateUserById).delete(idValidation,deleteUser);
router.route('/upload-image').post(upload.single('profileImage'),uploadImg);

module.exports=router;
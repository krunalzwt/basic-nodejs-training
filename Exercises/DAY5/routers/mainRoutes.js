const express=require('express');
const router=express.Router();
const {root,getAllUsers,getUserById,createUser,updateUserById,deleteUser, uploadImg, handleError}=require('../controllers/userController');
const idValidation = require('../middleware/idValid');
const createUserValidations = require('../middleware/createUserValidations');
const { upload } = require('../controllers/userController'); // Adjust the path to userController
const updateUserValidations = require('../middleware/updateUserValidations');



router.route('/').get(root);
router.route('/user-profile').get(getAllUsers).post(updateUserValidations,createUser);
router.route('/user-profile/:id').get(idValidation,getUserById).put(idValidation,updateUserById).delete(deleteUser);
// router.route('/upload-image/:id').post(upload.single('profileImage'),uploadImg,handleError);

module.exports=router;
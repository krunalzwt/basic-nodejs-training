const express=require('express');
const router=express.Router();
const {root,getAllUsersProfile,getUserProfileById,createUserProfile,updateUserProfile,deleteUserProfile}=require('../controllers/userProfileController');
const idValidation = require('../middleware/idValid');
const createUserValidations = require('../middleware/createUserValidations');
const updateUserValidations = require('../middleware/updateUserValidations');
const { getUserById } = require('../controllers/userController');
const { uploadImg, handleErrorImg,deleteUserImg, getUserImgById,getAllUsersImg,upload}=require('../controllers/userImgController.js');



router.route('/').get(root);
router.route('/user-profile').get(getAllUsersProfile).post(updateUserValidations,createUserProfile);
router.route('/user-profile/:id').get(getUserProfileById).put(updateUserProfile).delete(deleteUserProfile);
router.route('/user-images').get(getAllUsersImg);
router.route('/user-images/:id').delete(deleteUserImg).get(getUserImgById).post(upload.single('profileImage'),uploadImg,handleErrorImg);
router.route('/users/:id').get(getUserById);

module.exports=router;
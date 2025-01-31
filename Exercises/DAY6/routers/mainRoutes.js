const express=require('express');
const router=express.Router();
const {root,getAllUsersProfile,getUserProfileById,createUserProfile,updateUserProfile,deleteUserProfile}=require('../controllers/userProfileController');
const {idValidation,deleteIdValidation} = require('../middleware/idValid');
const createUserValidations = require('../middleware/createUserValidations');
const updateUserValidations = require('../middleware/updateUserValidations');
const { getUserById, getAllUsers, createUser, deleteUser, updateUserById } = require('../controllers/userController');
const { uploadImg, handleErrorImg,deleteUserImg, getUserImgById,getAllUsersImg,upload}=require('../controllers/userImgController.js');
const validation=require('../middleware/validationMiddleware.js');
const userProfileSchema=require('../Validations/userProfileValidations.js');
const { createUserSchema, updateUserSchema } = require('../Validations/userValidations.js');



router.route('/').get(root);

router.route('/user-profiles').get(getAllUsersProfile).post(validation(userProfileSchema),updateUserValidations,createUserProfile);
router.route('/user-profiles/:id').get(getUserProfileById).put(updateUserProfile).delete(deleteUserProfile);

router.route('/user-images').get(getAllUsersImg);
router.route('/user-images/:id').delete(deleteUserImg).get(getUserImgById).post(upload.single('profileImage'),uploadImg,handleErrorImg);

router.route('/users').get(getAllUsers).post(validation(createUserSchema),createUser);
router.route('/users/:id').get(getUserById).delete(deleteUser).patch(validation(updateUserSchema),updateUserById);

module.exports=router;
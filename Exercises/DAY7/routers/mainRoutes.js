const express=require('express');
const router=express.Router();
const {root,getAllUsersProfile,getUserProfileById,createUserProfile,updateUserProfile,deleteUserProfile}=require('../controllers/userProfileController');
const {idValidation,deleteIdValidation} = require('../middleware/idValid');
const createUserValidations = require('../middleware/createUserValidations');
const updateUserValidations = require('../middleware/updateUserValidations');
const { getUserById, getAllUsers, createUser, deleteUser, updateUserById, login } = require('../controllers/userController');
const { uploadImg, handleErrorImg,deleteUserImg, getUserImgById,getAllUsersImg,upload}=require('../controllers/userImgController.js');
const validation=require('../middleware/validationMiddleware.js');
const userProfileSchema=require('../Validations/userProfileValidations.js');
const { createUserSchema, updateUserSchema, loginuserSchema } = require('../Validations/userValidations.js');
const authenticateUser = require('../middleware/authMiddleware.js');
const authorizeUser = require('../middleware/authorizeUser.js');
const authorizeUserProfile = require('../middleware/authorizeUserProfile.js');



router.route('/').get(root);

router.route('/user-profiles').get(authenticateUser,getAllUsersProfile).post(authenticateUser,authorizeUserProfile,validation(userProfileSchema),updateUserValidations,createUserProfile).patch(authenticateUser,authorizeUserProfile,updateUserProfile);
router.route('/user-profiles/:id').get(authenticateUser,getUserProfileById).delete(authenticateUser,authorizeUserProfile,deleteUserProfile);

router.route('/user-images').get(authenticateUser,getAllUsersImg);
router.route('/user-images/:id').delete(authenticateUser,authorizeUserProfile,deleteUserImg).get(authenticateUser,getUserImgById).post(authenticateUser,authorizeUserProfile,upload.single('profileImage'),uploadImg,handleErrorImg);

router.route('/users').get(authenticateUser,getAllUsers).post(authenticateUser,validation(createUserSchema),createUser);
router.route('/users/:id').get(authenticateUser,getUserById).delete(authenticateUser,authorizeUser,deleteUser).patch(authenticateUser,authorizeUser,validation(updateUserSchema),updateUserById);

router.route('/signup').post(validation(createUserSchema),createUser)
router.route('/login').post(validation(loginuserSchema),login);

module.exports=router;
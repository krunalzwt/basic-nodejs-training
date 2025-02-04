const express=require('express');
const { getAllCategories, createCategories } = require('../controllers/productAndCategoriesController');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const { route } = require('./authRoutes');
const router=express.Router();

router.route('/categories').get(getAllCategories).post(authorizeAdmin,createCategories);

router.route('/products').get().post();

router.route('/products/:id').get().put().delete();

module.exports=router;

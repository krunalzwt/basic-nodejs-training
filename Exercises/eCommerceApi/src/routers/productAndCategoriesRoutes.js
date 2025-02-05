const express=require('express');
const router=express.Router();
const { getAllCategories, createCategories, upload, createProduct, getAllProducts, getProductById, updateProductById, deleteProduct } = require('../controllers/productAndCategoriesController');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.route('/categories').get(getAllCategories).post(authorizeAdmin,createCategories);

router.route('/products').get(getAllProducts).post(authorizeAdmin,upload.single('productPicture'),createProduct);

router.route('/products/:id').get(getProductById).patch(authorizeAdmin,upload.single('productPicture'),updateProductById).delete(authorizeAdmin,deleteProduct);

module.exports=router;

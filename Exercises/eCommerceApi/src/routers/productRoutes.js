const express=require('express');
const router=express.Router();
const { getAllCategories, createCategories, upload, createProduct, getAllProducts, getProductById, updateProductById, deleteProduct } = require('../controllers/productAndCategoriesController');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const authorizeCustomer = require('../middleware/authorizeCustomer');
const { getCartItems, addCartIteams, removeIteamsInCart, getWishList, addItemsInWishlist, removeItemsFromWishlist } = require('../controllers/cartAndWishlistController');
const { getAllOrders, placeNewOrder } = require('../controllers/orderProcessingController');
const validation=require('../middleware/validationMiddleware');
const { createCategorySchema, createProductSchema, updateProductSchema } = require('../Validations/productAndCategoryValidations');
const { createCartSchema, createWishlistSchema } = require('../Validations/cartAndWishlistValidations');




// product and categories routes
router.route('/categories').get(getAllCategories).post(authorizeAdmin,validation(createCategorySchema),createCategories);

router.route('/products').get(getAllProducts).post(authorizeAdmin,validation(createProductSchema),upload.single('productPicture'),createProduct);

router.route('/products/:id').get(getProductById).patch(authorizeAdmin,validation(updateProductSchema),upload.single('productPicture'),updateProductById).delete(authorizeAdmin,deleteProduct);


// cart and wishlist routes
router.route('/cart').get(authorizeCustomer,getCartItems).post(authorizeCustomer,validation(createCartSchema),addCartIteams);

router.route('/cart/:id').delete(authorizeCustomer,removeIteamsInCart);

router.route('/wishlist').get(authorizeCustomer,getWishList).post(authorizeCustomer,validation(createWishlistSchema),addItemsInWishlist);

router.route('/wishlist/:id').delete(authorizeCustomer,removeItemsFromWishlist);


// order processing routes
router.route('/orders').get(getAllOrders).post(placeNewOrder);

router.route('/orders/:id').get().put();





module.exports=router;
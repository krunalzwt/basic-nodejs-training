const express=require('express');
const router=express.Router();
const { getAllCategories, createCategories, upload, createProduct, getAllProducts, getProductById, updateProductById, deleteProduct } = require('../controllers/productAndCategoriesController');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const authorizeCustomer = require('../middleware/authorizeCustomer');
const { getCartItems, addCartIteams, removeIteamsInCart, getWishList, addItemsInWishlist, removeItemsFromWishlist } = require('../controllers/cartAndWishlistController');
const { getAllOrders, placeNewOrder, getOrderDetailsById, updateOrderStatus } = require('../controllers/orderProcessingController');
const validation=require('../middleware/validationMiddleware');
const { createCategorySchema, createProductSchema, updateProductSchema } = require('../Validations/productAndCategoryValidations');
const { createCartSchema, createWishlistSchema } = require('../Validations/cartAndWishlistValidations');
const { updateStatusSchema } = require('../Validations/ordersValidations');
const { idValidationSchema } = require('../Validations/idValidationSchema');




// product and categories routes
router.route('/categories').get(getAllCategories).post(authorizeAdmin,validation(createCategorySchema),createCategories);

router.route('/products').get(getAllProducts).post(authorizeAdmin,upload.single('productPicture'),validation(createProductSchema),createProduct);

router.route('/products/:id').get(validation(idValidationSchema),getProductById).patch(authorizeAdmin,validation(idValidationSchema),upload.single('productPicture'),validation(updateProductSchema),updateProductById).delete(authorizeAdmin,validation(idValidationSchema),deleteProduct);


// cart and wishlist routes
router.route('/cart').get(authorizeCustomer,getCartItems).post(authorizeCustomer,validation(createCartSchema),addCartIteams);

router.route('/cart/:id').delete(authorizeCustomer,validation(idValidationSchema),removeIteamsInCart);

router.route('/wishlist').get(authorizeCustomer,getWishList).post(authorizeCustomer,validation(createWishlistSchema),addItemsInWishlist);

router.route('/wishlist/:id').delete(authorizeCustomer,validation(idValidationSchema),removeItemsFromWishlist);


// order processing routes
router.route('/orders').get(authorizeCustomer,getAllOrders).post(authorizeCustomer,placeNewOrder);

router.route('/orders/:id').get(authorizeCustomer,validation(idValidationSchema),getOrderDetailsById);

router.route('/orders/:id/status').put(authorizeCustomer,validation(idValidationSchema),validation(updateStatusSchema),updateOrderStatus);





module.exports=router;
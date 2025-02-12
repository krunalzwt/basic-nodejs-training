const express=require('express');
const router=express.Router();
const { getAllCategories, createCategories, upload, createProduct, getAllProducts, getProductById, updateProductById, deleteProduct } = require('../controllers/productAndCategoriesController');
const authorizeAdmin = require('../middleware/authorizeAdmin');
const authorizeCustomer = require('../middleware/authorizeCustomer');
const { getCartItems, addCartIteams, removeIteamsInCart, getWishList, addItemsInWishlist, removeItemsFromWishlist } = require('../controllers/cartAndWishlistController');
const { getAllOrders, placeNewOrder, getOrderDetailsById, updateOrderStatus, getAllOrdersItems } = require('../controllers/orderProcessingController');
const validation=require('../middleware/validationMiddleware');
const { createCategorySchema, createProductSchema, updateProductSchema } = require('../Validations/productAndCategoryValidations');
const { createCartSchema, createWishlistSchema } = require('../Validations/cartAndWishlistValidations');
const { updateStatusSchema } = require('../Validations/ordersValidations');
const { idValidationSchema } = require('../Validations/idValidationSchema');
const authMiddleware=require('../middleware/authMiddleware');




// product and categories routes
router.route('/categories').get(getAllCategories).post(authorizeAdmin,validation(createCategorySchema),createCategories);

router.route('/products').get(getAllProducts).post(authorizeAdmin,upload.single('productPicture'),validation(createProductSchema),createProduct);

router.route('/products/:id').get(validation(idValidationSchema),getProductById).patch(authorizeAdmin,validation(idValidationSchema),upload.single('productPicture'),validation(updateProductSchema),updateProductById).delete(authorizeAdmin,validation(idValidationSchema),deleteProduct);


// cart and wishlist routes
router.route('/cart').get(authorizeCustomer,authMiddleware,getCartItems).post(authorizeCustomer,authMiddleware,validation(createCartSchema),addCartIteams);

router.route('/cart/:id').delete(authorizeCustomer,authMiddleware,validation(idValidationSchema),removeIteamsInCart);

router.route('/wishlist').get(authorizeCustomer,authMiddleware,getWishList).post(authorizeCustomer,authMiddleware,validation(createWishlistSchema),addItemsInWishlist);
    
router.route('/wishlist/:id').delete(authorizeCustomer,authMiddleware,validation(idValidationSchema),removeItemsFromWishlist);


// order processing routes
router.route('/orders').get(authorizeCustomer,getAllOrders).post(authorizeCustomer,authMiddleware,placeNewOrder);

router.route('/orders/:id').get(authorizeCustomer,validation(idValidationSchema),getOrderDetailsById);

router.route('/orders/:id/status').put(authorizeAdmin,validation(idValidationSchema),validation(updateStatusSchema),updateOrderStatus);

router.route('/orderitem').get(authorizeCustomer,getAllOrdersItems)





module.exports=router;
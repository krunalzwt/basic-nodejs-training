const express=require('express');
const router=express.Router();
const authorizeCustomer = require('../middleware/authorizeCustomer');
const { getCartItems, addCartIteams, removeIteamsInCart, getWishList, addItemsInWishlist, removeItemsFromWishlist } = require('../controllers/cartAndWishlistController');


router.route('/cart').get(authorizeCustomer,getCartItems).post(authorizeCustomer,addCartIteams);

router.route('/cart/:id').delete(authorizeCustomer,removeIteamsInCart);

router.route('/wishlist').get(authorizeCustomer,getWishList).post(authorizeCustomer,addItemsInWishlist);

router.route('/wishlist/:id').delete(authorizeCustomer,removeItemsFromWishlist);


module.exports=router;
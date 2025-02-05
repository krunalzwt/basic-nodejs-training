const express=require('express');
const { getAllOrders, placeNewOrder } = require('../controllers/orderProcessingController');
const router=express.Router();


router.route('/orders').get(getAllOrders).post(placeNewOrder);

router.route('/orders/:id').get().put();

module.exports=router;
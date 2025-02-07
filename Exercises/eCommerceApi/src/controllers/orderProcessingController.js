const orders = require("../models/ordersModel");
const orderItems = require("../models/orderItemsModel");
// const secret = "abc$@123$";
// const jwt = require("jsonwebtoken");
const cart = require("../models/cartModel");
const products = require("../models/productsModel");
const { where } = require("sequelize");
const {sendOrderConfirmationEmail}=require('../services/mailService');

const getAllOrders = async (req, res) => {
  try {
    const rows = await orders.findAll();
    if (rows.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }
    return res.json(rows);
  } catch (error) {
    return res.status(500).send("Failed to fetch all orders.");
  }
};


const placeNewOrder = async (req, res) => {
  try {
    const userIdFromToken = req.user.id;

    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }

    const cartData = await cart.findAll({
      where: { user_id: userIdFromToken },
      include: [
        {
          model: products,
          attributes: ["id", "name", "price", "stock"],
        },
      ],
    });

    if (cartData.length === 0) {
      return res.status(404).json({ error: "No items in cart!" });
    }

    for (const item of cartData) {
      const product = await products.findByPk(item.product_id);
      if (!product || item.quantity > product.stock) {
        return res.status(403).json({
          error: `Insufficient stock for product ${item.product?.name || item.product_id}`,
        });
      }
    }

    const totalSum = cartData.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);


    const orderTableData = await orders.create({
      user_id: userIdFromToken,
      total_price: totalSum,
    });

    const orderItemsData = [];
    for (const item of cartData) {
      const product = await products.findByPk(item.product_id);
      const orderItem = await orderItems.create({
        order_id: orderTableData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price,
      });
      orderItemsData.push(orderItem);

      const remainingStock = product.stock - item.quantity;
      await products.update(
        { stock: remainingStock },
        { where: { id: item.product_id } }
      );
    }

    await cart.destroy({
      where: { user_id: userIdFromToken },
    });

    await sendOrderConfirmationEmail(req.user.email, orderTableData, orderItemsData);

    return res.status(201).json({
      confirmation: "Order has been placed!",
      orderDetails: orderItemsData,
      total_amount: totalSum,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const getOrderDetailsById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const orderDetails = await orders.findByPk(orderId, {
      include: [
        {
          model: orderItems,
          attributes: ["product_id", "quantity", "price"],
        },
      ],
    });

    if (!orderDetails) {
      return res.status(404).send({ message: "Order not found" });
    }

    return res.status(200).send(orderDetails);
  } catch (error) { 
    return res.status(500).send({ message: "An error occurred", error: error.message });
  }
};

const updateOrderStatus=async(req,res)=>{
  try{
    const orderId=req.params.id;
    const desiredStatus=req.body.status;
    const [statusUpdate]=await orders.update({status:desiredStatus},{where:{id:orderId}});
    if (statusUpdate === 0) {
      return res.status(404).json({ error: "Order not found or status unchanged" });
    }
    const orderData=await orders.findByPk(orderId);
    return res.status(200).send(orderData);

  }catch(error){
    return res.status(500).send({ message: "An error occurred", error: error.message });
  }
}

module.exports = { getAllOrders, placeNewOrder,getOrderDetailsById ,updateOrderStatus};

const orders = require("../models/ordersModel");
const orderItems = require("../models/orderItemsModel");
const secret = "abc$@123$";
const jwt = require("jsonwebtoken");
const cart = require("../models/cartModel");
const products = require("../models/productsModel");
const { where } = require("sequelize");

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

    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedtoken = jwt.verify(token, secret);
    const userIdFromToken = decodedtoken.id;

    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }

    const cartData = await cart.findAll({
      where: { user_id: userIdFromToken },
      include: [
        {
          model: products,
          attributes: ["name", "price", "stock"],
        },
      ],
    });

    // Check if the cart is empty
    if (cartData.length === 0) {
      return res.status(404).json({ error: "No items in cart!" });
    }

    // Calculate total price and total quantity
    const totalSum = cartData.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    const totalQuantity = cartData.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    // Check total stock of required product 
    const productId = cartData[0].product_id;
    const product = await products.findByPk(productId);
    const availableStock = product.stock;

    if (totalQuantity > availableStock) {
      return res.status(403).send("Required stock is not available, please remove some items!");
    }

    const orderTableData = await orders.create({
      user_id: userIdFromToken,
      total_price: totalSum,
    });

    const orderItemsData = await orderItems.create({
      order_id: orderTableData.id,  
      product_id: parseInt(cartData[0].product_id),
      quantity: totalQuantity,
      price: parseInt(cartData[0].product?.price),
    });

    // Update the product stock
    const remainingStock = product.stock - totalQuantity;
    await products.update(
      { stock: remainingStock },
      { where: { id: productId } }
    );

    // Remove cart items after the order is placed
    await cart.destroy({
      where: { user_id: userIdFromToken },
    });

    return res.status(201).json({
      confirmation: "Order has been placed!",
      orderDetails: orderItemsData,
      total_amount: orderTableData,
    });
  } catch (error) {
    return res.status(500).send({ message: "An error occurred", error: error.message });
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

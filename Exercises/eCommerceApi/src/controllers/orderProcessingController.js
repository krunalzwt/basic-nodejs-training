const orders = require("../models/ordersModel");
const orderItems = require("../models/orderItemsModel");
const secret = "abc$@123$";
const jwt = require("jsonwebtoken");
const cart = require("../models/cartModel");
const products = require("../models/productsModel");

const getAllOrders = async (req, res) => {
  try {
    const rows = await orders.findAll();
    if (rows.length === 0) {
      return res.status(404).json({ error: "No orders found" });
    }
    return res.json(rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).send("Failed to fetch all orders.");
  }
};

// const orderIteamTableData = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.replace("Bearer ", "");
//     const decodedtoken = jwt.verify(token, secret);
//     const userIdFromToken = decodedtoken.id;
//     if (isNaN(userIdFromToken)) {
//       return res.status(400).send("Invalid User ID");
//     }

//     const order_id = await orders.find;

//   } catch (error) {
//     return res.status(500).send("Failed to fetch order data!!");
//   }
// };

const placeNewOrder = async (req, res) => {
  try {
    // const { total_price } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");
    const decodedtoken = jwt.verify(token, secret);
    const userIdFromToken = decodedtoken.id;
    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }

    // const cartData=await cart.findAll({where:{user_id:userIdFromToken}});
    const cartData = await cart.findAll({
      where: { user_id: userIdFromToken },
      include: [
        {
          model: products,
          attributes: ["name", "price"],
        },
      ],
    });
    if (cartData.length === 0) {
      return res.status(404).json({ error: "No items in cart!" });
    }
    const totalSum = cartData.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    // return res.json({
    //   total: totalSum,
    //   cartItems: cartData.map((item) => ({
    //     name: item.product.name,
    //     name: item.product.name,
    //     quantity: item.quantity,
    //     price: item.product.price,
    //   })),
    // });

    const orderItemsData=await orders.create({user_id:userIdFromToken,total_price:totalSum});

    // incomplet from here.........

    return res.status(201).json(orderItemsData);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { getAllOrders, placeNewOrder };

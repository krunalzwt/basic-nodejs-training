const users = require("../models/usersModel");
const cart = require("../models/cartModel");
const products = require("../models/productsModel");
const wishlist = require("../models/wishlistModel");

// CART CONTROLLERS

const getCartItems = async (req, res) => {
  try {
    const userIdFromToken = parseInt(req.user.id);
    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }
    const userCart = await cart.findAll({
      where: { user_id: userIdFromToken },
      include: [
        {
          model: products,
          attributes: ["name"],
        },
      ],
    });
    if (userCart.length === 0) {
      return res.status(404).send("Cart is empty, Please add some Products!!");
    }
    res.status(200).json(userCart);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send("Failed to fetch user.");
  }
};

// ADD ITEMS IN THE CART

const addCartIteams = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const checkProductId = await products.findAll({
      where: { id: product_id },
    });
    // console.log(checkProductId);
    if (checkProductId.length === 0) {
      return res
        .status(404)
        .send("there is no product with this id is available!!");
    }
    const userIdFromToken = parseInt(req.user.id);
    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }

    const existingCartItem = await cart.findOne({
      where: { user_id: userIdFromToken, product_id },
    });

    if (existingCartItem) {
      const updatedQuantity = parseInt(existingCartItem.quantity) + parseInt(quantity);
      await cart.update(
        { quantity: updatedQuantity },
        { where: { id: existingCartItem.id } }
      );

      return res.status(200).json({ message: "Cart updated successfully!" });
    } else {

      const result = await cart.create({
        user_id: userIdFromToken,
        product_id,
        quantity,
      });

      return res.status(201).json(result);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// REMOVE ITEMS FROM THE CART WITH PRODUCT ID (i.e : I WANT TO REMOVE THIS PARTICULAR ITEM(product_id))
const removeIteamsInCart = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIdFromToken = parseInt(req.user.id);
    const product = await cart.destroy({
      where: { id: id, user_id: userIdFromToken },
    });
    if (!product) {
      return res
        .status(404)
        .send("product already removed/this product is not in your cart!");
    }
    res.status(200).send("item removed successfully!!");
  } catch (error) {
    return res.status(500).send(error);
  }
};


// WISHLIST CONTROLLERS

const getWishList = async (req, res) => {
  try {
    const userIdFromToken = parseInt(req.user.id);
    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }
    const userCart = await wishlist.findAll({
      where: { user_id: userIdFromToken },
      include: [
        {
          model: products,
          attributes: ["name"],
        },
      ],
    });
    if (userCart.length === 0) {
      return res
        .status(404)
        .send("WishList is empty, Please add some Products!!");
    }
    res.status(200).json(userCart);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).send("Failed to fetch wishlist.");
  }
};

const addItemsInWishlist = async (req, res) => {
  try {
    const { product_id } = req.body;
    const checkProductId = await products.findAll({
      where: { id: product_id },
    });
    if (checkProductId.length === 0) {
      return res
        .status(404)
        .send("there is no product with this id is available!!");
    }

    const userIdFromToken = parseInt(req.user.id);

    const checkPIdFromWishlist = await wishlist.findAll({
      where: { product_id },
    });

    const checkWishlistItem = await wishlist.findOne({
      where: { user_id: userIdFromToken, product_id },
    }); 

    if (checkWishlistItem) {
      return res.status(403).send("This item already exists in your wishlist!");
    }

    if (isNaN(userIdFromToken)) {
      return res.status(400).send("Invalid User ID");
    }
    const result = await wishlist.create({
      user_id: userIdFromToken,
      product_id,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// REMOVE ITEM FROM WISHLIST WITH PRODUCT_ID

const removeItemsFromWishlist = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIdFromToken = parseInt(req.user.id);
    const product = await wishlist.destroy({
      where: { id: id, user_id: userIdFromToken },
    });
    if (!product) {
      return res
        .status(404)
        .send("product already removed/this product is not in your wishlist!");
    }
    res.status(200).send("item removed successfully!!");
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getCartItems,
  addCartIteams,
  removeIteamsInCart,
  getWishList,
  addItemsInWishlist,
  removeItemsFromWishlist,
};

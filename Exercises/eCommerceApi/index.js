const express=require('express');
const app=express();
const port=8080;
const {sequelize} = require("./src/config/dbConnection.js");
const users=require('./src/models/usersModel.js');
const products=require('./src/models/productsModel.js');
const categories=require('./src/models/categoriesModel.js');
const cart=require('./src/models/cartModel.js');
const orderItems=require('./src/models/orderItemsModel.js');
const orders=require('./src/models/ordersModel.js');
const whishlist=require('./src/models/wishlistModel.js');
const { root } = require('./src/controllers/userController.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => console.log("Database connected and tables created"))
  .catch(err => console.error("database connection failed:", err));

  
  app.get('/',root);
  app.use("/api",require("./src/routers/authRoutes.js")); 
  app.use("/api",require("./src/routers/userRoutes.js"));
  app.use('/api',require('./src/routers/productAndCategoriesRoutes.js'));
  app.use('/api',require('./src/routers/cartAndWishlistRoutes.js'));
  app.use('/api',require('./src/routers/orderProcessingRoutes.js'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
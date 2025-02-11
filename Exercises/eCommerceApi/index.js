const express=require('express');
const app=express();
const path = require('path');
const dotenv=require('dotenv').config({path:path.resolve(__dirname,'../../.env')});
const port=process.env.APP_PORT2 || 8080;
const {sequelize} = require("./src/config/dbConnection.js");
const users=require('./src/models/usersModel.js');
const products=require('./src/models/productsModel.js');
const categories=require('./src/models/categoriesModel.js');
const cart=require('./src/models/cartModel.js');
const orderItems=require('./src/models/orderItemsModel.js');
const orders=require('./src/models/ordersModel.js');
const whishlist=require('./src/models/wishlistModel.js');
const { root } = require('./src/controllers/userController.js');
const cors = require("cors");

app.use("/uploads", express.static(path.join("D:", "NodeJs", "Exercises", "eCommerceApi", "uploads")));


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => console.log("Database connected and tables created"))
  .catch(err => console.error("database connection failed:", err));

  
  app.get('/',root);
  app.use("/api",require("./src/routers/authRoutes.js")); 
  app.use("/api",require("./src/routers/userRoutes.js"));
  app.use('/api',require('./src/routers/productRoutes.js'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
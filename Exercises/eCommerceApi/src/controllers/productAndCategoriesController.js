const products = require('../models/productsModel');
const categories=require('../models/categoriesModel');

const getAllCategories = async (req, res) => {
    try {
      const rows = await categories.findAll();
      if (rows.length === 0) {
        return res.status(404).json({ error: "No categories found" });
      }
      return res.json(rows);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).send("Failed to fetch categories.");
    }
};

const createCategories = async(req, res) => {
    try {
      const { name } = req.body;
      const result = await categories.create({
        name,
      });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).send(error);
    }
};

module.exports={getAllCategories,createCategories}
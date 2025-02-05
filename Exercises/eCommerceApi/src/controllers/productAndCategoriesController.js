const path = require("path");
const multer = require("multer");
const uploadsDir = path.join(__dirname, "../../uploads");
const products = require("../models/productsModel");
const categories = require("../models/categoriesModel");
const fs = require("fs");

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

const createCategories = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCategory = await categories.findOne({ where: { name } });
    if (existingCategory) {
      return res.status(403).send("category already exists!!");
    }
    const result = await categories.create({
      name,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const rows = await products.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "category_id",
        "image_url",
      ],
    });
    if (rows.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    return res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).send("Failed to fetch products.");
  }
};

// CREATE PRODUCT...
// MULTER : FILENAME AND STORAGE FUNCTION

// const createUploadDir = (dir) => {
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//   }
//   return uploadsDir;
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

// MULTER: FILESIZE,EXTENSION AND STORAGE VALIDATIONS
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed!"), false);
    }
    cb(null, true);
  },
});

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;
    const result = await products.create({
      name,
      description,
      price,
      stock,
      category_id,
      image_url: req.file.path,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await products.findByPk(id, {
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "stock",
        "category_id",
      ],
    });
    if (!rows) {
      return res.status(404).json({ error: "No products found" });
    }
    return res.json(rows);
  } catch (error) {
    // console.error("Error fetching products:", error);
    return res.status(500).send("Failed to fetch products.");
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, stock, category_id } = req.body;

    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }

    const updateQuery = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(stock && { stock }),
      ...(category_id && { category_id }),
      ...(req.file && { image_url: req.file.path }),
    };

    if (Object.keys(updateQuery).length === 0) {
      return res.status(400).json({ error: "No fields to update!" });
    }

    if (req.file && product.image_url) {
      const oldImagePath = path.join(uploadsDir, path.basename(product.image_url));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const [rows] = await products.update(updateQuery, { where: { id } });

    if (rows === 0) {
      return res.status(404).json({ error: "id is not available!" });
    }

    return res.json({
      message: "Product updated successfully!!",
      updatedFields: updateQuery,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ error: "Failed to update product.", details: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "product id does not exist!!!" });
    }
    if (product.image_url) {
      const imagePath = path.join(uploadsDir, path.basename(product.image_url));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    const productDelete = await products.destroy({ where: { id } });
    
    res.status(200).send("product deleted successfully!!");
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).send("Failed to delete product.");
  }
};

module.exports = {
  getAllCategories,
  createCategories,
  getAllProducts,
  createProduct,
  upload,
  createProduct,
  getProductById,
  updateProductById,
  deleteProduct,
};

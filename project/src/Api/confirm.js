const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log("Database connection error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema, 'items');

// Uncomment and define the `authenticate` middleware if needed
// function authenticate(req, res, next) {
//   // Authentication logic here
//   next();
// }

// Add Product
app.post("/add-product", async (req, res) => {
  const { productName, quantity, price } = req.body;

  if (!productName || quantity == null || price == null) {
    return res.status(400).send("Product name, quantity, and price are required");
  }

  try {
    const newProduct = new Product({ productName, quantity, price });
    await newProduct.save();
    res.status(201).send("Product added successfully");
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// Get All Products with Sorting and Filtering
app.get("/products", async (req, res) => {
  try {
    const { sort, priceMin, priceMax } = req.query;
    let filter = {};

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    let query = Product.find(filter);
    if (sort) query = query.sort({ price: sort === "asc" ? 1 : -1 });

    const products = await query;
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// Delete Product
app.delete("/product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Product not found");

    res.status(200).send("Product deleted successfully");
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// Update Product
app.put("/product/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).send("Product not found");

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

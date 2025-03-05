const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB for Products
mongoose.connect('mongodb://localhost:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Products Database connected successfully'))
  .catch((err) => console.log("Products Database connection error:", err));

// Connect to MongoDB for Users
const userDB = mongoose.createConnection('mongodb://localhost:27017/logininfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});
userDB.on('open', () => console.log('Users Database connected successfully'));
userDB.on('error', (err) => console.log("Users Database connection error:", err));

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

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
});

const User = userDB.model("User", userSchema, "users");

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

// Registration endpoint
app.post("/register", async (req, res) => {
  const { name, email, mobile, password, confirmPassword } = req.body;

  if (!name || !email || !mobile || !password || !confirmPassword) {
    return res.status(400).send("All fields are required");
  }

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, mobile, password: hashedPassword });

    await newUser.save();
    res.status(201).send("Registration successful");
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User does not exist. Please register.");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Incorrect password. Try again.");
    }

    res.status(200).send("Login successful");
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

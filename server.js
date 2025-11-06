// Import dependencies
require('dotenv').config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Create Express app
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON body

// MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST || "bjsfazb5gixjiy34lqy5-mysql.services.clever-cloud.com",
  user: process.env.MYSQL_USER || "ufdh7kcqcxlu1xln",
  password: process.env.MYSQL_PASSWORD || "zOq8D2woXJbtAa0fa10z",
  database: process.env.MYSQL_DATABASE || "bjsfazb5gixjiy34lqy5",
  port: process.env.MYSQL_PORT || 3306
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

// Example route
app.get("/", (req, res) => {
  res.send("E-commerce backend is running 🚀");
});

// Example API: get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Database query error" });
    } else {
      res.json(results);
    }
  });
});

// Get all products
app.get("/getProduct", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ status: "error", message: "Failed to fetch products" });
    } else {
      res.json({ status: "success", data: results });
    }
  });
});

// Add to cart
app.post("/addtocart", (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id) {
    return res.status(400).json({ status: "error", message: "Invalid Product ID" });
  }

  const qty = quantity || 1;

  db.query(
    "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
    [product_id, qty],
    (err, results) => {
      if (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ status: "error", message: "Failed to add item to cart" });
      } else {
        res.json({
          status: "success",
          message: "Item added to cart",
          cart_id: results.insertId
        });
      }
    }
  );
});

// Place order
app.post("/placeOrder", (req, res) => {
  const { user_id, product_id, address, payment_option } = req.body;

  if (!user_id || !address || !payment_option) {
    return res.status(400).json({ status: "error", message: "Missing required fields" });
  }

  db.query(
    "INSERT INTO orders (user_id, address, payment_option) VALUES (?, ?, ?)",
    [user_id, address, payment_option],
    (err, results) => {
      if (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ status: "error", message: "Order failed: " + err.message });
      } else {
        res.json({ status: "success", message: "Order placed successfully" });
      }
    }
  );
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

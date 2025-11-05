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
  host: process.env.MYSQL_HOST || "bjsfazb5gixjiy34lqy5-mysql.services.clever-cloud.combjsfazb5gixjiy34lqy5-mysql.services.clever-cloud.com",
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
      res.status(500).send("Database query error");
    } else {
      res.json(results);
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

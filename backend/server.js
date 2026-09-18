const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Item = require("./models/Item");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Lost & Found Backend is running!");
});

// Create Lost or Found Item
app.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);

    const savedItem = await item.save();

    res.status(201).json({
      message: "Item reported successfully!",
      item: savedItem,
    });
  } catch (error) {
    console.error("Error saving item:", error);

    res.status(500).json({
      message: "Failed to save item",
      error: error.message,
    });
  }
});

// Get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);

    res.status(500).json({
      message: "Failed to fetch items",
      error: error.message,
    });
  }
});

mongoose
  .connect(process.env.MONGODB_URI, {
    tls: true,
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
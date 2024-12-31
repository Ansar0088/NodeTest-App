const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://AnsarDev:y_mwwgR5NDaeuVY@cluster0.6rk8y.mongodb.net/EcommerceTest?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected successfully, Ansar!");
  } catch (err) {
    console.error("Database connection failed hai Ansar:", err.message);
    process.exit(1);
  }
}
main();

const server = express();
exports.server = server;
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));
server.use(cors());

const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("Decoded Token:", decoded);

    if (decoded.email) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// api routes
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

server.use("/products", auth,productRouter);
server.use("/users",auth, userRouter);

// Start the Express Server
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});

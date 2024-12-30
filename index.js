const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
require("dotenv").config();


// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect("mongodb+srv://AnsarDev:y_mwwgR5NDaeuVY@cluster0.6rk8y.mongodb.net/EcommerceTest?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
const productRouter = require("./routes/product");
const userController = require("./routes/user");

server.use("/products", productRouter);
server.use("/users", userController.routes);


// Start the Express Server
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});

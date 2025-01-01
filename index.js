const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

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
const publicKey = fs.readFileSync("public.key", "utf8");

const auth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  let token = authHeader.split(" ")[1];

  token = token.replace(/^"|"$/g, "");

  try {
    const decoded = jwt.verify(token,publicKey);
    console.log("Decoded Token:", decoded);

    if (decoded.email) {
      req.user = decoded;
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
const authRouter=require("./routes/auth")
server.use("/products", auth,productRouter);
server.use("/users",auth, userRouter);
server.use("/auth",authRouter)



// Start the Express Server
server.listen(8081, () => {
  console.log("Server is running on port 8081");
});

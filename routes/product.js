const express = require("express");

const productController=require('../controller/product')
const router =express.Router()

router
.get("/products/:id?",productController. getProduct)
.get("/products", productController.getAllProducts)
.post("/products", productController.createProduct)
.put("/products/:id", productController.replaceProducrs)
.patch("/products/:id",productController. updateProduct)
.delete("/products/:id", productController.deleteProducts)

exports.routes=router
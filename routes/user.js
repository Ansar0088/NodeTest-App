const express = require("express");

const userController=require('../controller/user')
const router =express.Router()

router
.get("/:id?",userController. getUser)
.get("/", userController.getAllUser)
.post("/", userController.createUser)
.put("/:id", userController.replaceUser)
.patch("/:id",userController. updateUser)
.delete("/:id", userController.deleteUser)

exports.routes=router
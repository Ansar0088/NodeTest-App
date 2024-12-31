const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);
router.patch("/:id", userController.updateUser); 
router.put("/:id", userController.replaceUser);  
router.delete("/:id", userController.deleteUser);

module.exports = router;

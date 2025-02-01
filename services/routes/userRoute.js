const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../../middlewares/authMiddleware");

// Rute untuk registrasi user
router.post("/register", userController.registerUser);
router.patch("/me", authMiddleware, userController.updateUser);

module.exports = router;

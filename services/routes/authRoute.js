const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../../middlewares/authMiddleware");

// Route untuk login
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.me);

module.exports = router;

const express = require("express");
const router = express.Router();

const userRoutes = require("./../services/users/routes/index");
const postRoutes = require("../services/posts/routes/index");
const authRoutes = require("../services/auth/routes");

router.get("/", (req, res) => {
  res.json({ message: "Halo, selamat datang di API users" });
});
router.use("/user", userRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);

module.exports = router;

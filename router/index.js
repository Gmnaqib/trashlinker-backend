const express = require("express");
const router = express.Router();

const userRoutes = require("./../services/routes/userRoute");
// const postRoutes = require("../services/posts/routes/index");
const authRoutes = require("../services/routes/authRoute");
const volunteerRoutes = require("../services/routes/volunteerRoutes")

router.get("/", (req, res) => {
  res.json({ message: "Halo, selamat datang di API TRASH LINKER" });
});
router.use("/user", userRoutes);
// router.use("/post", postRoutes);
router.use("/auth", authRoutes);
router.use("/volunteer", volunteerRoutes);

module.exports = router;

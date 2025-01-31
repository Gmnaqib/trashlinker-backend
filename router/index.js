const express = require("express");
const router = express.Router();

const userRoutes = require("./../services/routes/userRoute");
const postRoutes = require("../services/routes/postRoute");
const authRoutes = require("../services/routes/authRoute");
const volunteerRoutes = require("../services/routes/volunteerRoutes")
const tpaRoutes = require("../services/routes/tpaRoute")

router.get("/", (req, res) => {
  res.json({ message: "Halo, selamat datang di API TRASH LINKER" });
});
router.use("/user", userRoutes);
router.use("/posts", postRoutes);
router.use("/auth", authRoutes);
router.use("/volunteer", volunteerRoutes);
router.use("/tpa", tpaRoutes);

module.exports = router;

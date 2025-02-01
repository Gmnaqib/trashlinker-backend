const express = require("express");
const router = express.Router();
const tpaController = require("../controllers/tpaController");
// const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../utils/upload");

router.get("/", tpaController.getAllTpa);
router.get("/:id", tpaController.getTpaById);
router.post("/", upload.single("tpa_image"), tpaController.createTpa);
router.patch("/:id", upload.single("tpa_image"), tpaController.updateTpa);
router.delete("/:id", tpaController.deleteTpa);

module.exports = router;

const express = require("express");
const router = express.Router();
const tpaController = require("../controllers/tpaController");
// const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../utils/upload"); // Untuk upload gambar

// Mendapatkan semua TPA
router.get("/", tpaController.getAllTpa);

// Mendapatkan satu TPA berdasarkan ID
router.get("/:id", tpaController.getTpaById);

// Menambahkan TPA baru (butuh autentikasi dan upload gambar)
router.post("/", upload.single("tpa_image"), tpaController.createTpa);

// Mengupdate data TPA
router.patch("/:id", upload.single("tpa_image"), tpaController.updateTpa);

// Menghapus TPA
router.delete("/:id", tpaController.deleteTpa);

module.exports = router;

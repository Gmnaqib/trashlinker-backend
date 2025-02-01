const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../utils/upload");

// Route to create a new post
router.post("/", authMiddleware, upload.single("image"), postController.addPost);
router.get("/radius", authMiddleware, postController.getAllPostsWithinRadius);
router.get("/", authMiddleware, postController.getAllPosts);

module.exports = router;

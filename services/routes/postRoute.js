const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../utils/upload");

// Route to create a new post
router.post("/", authMiddleware, upload.single("image"), postController.addPost);
router.get("/", authMiddleware, postController.getAllPostsWithinRadius);
router.get("/", authMiddleware, postController.getAllPosts);
router.patch("/:id", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;

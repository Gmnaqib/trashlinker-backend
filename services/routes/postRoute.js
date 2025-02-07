const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("../../utils/upload");

// Route to create a new post
router.post("/", authMiddleware, upload.single("image"), postController.addPost);
router.patch("/:id/addVolunteer", authMiddleware, postController.addToVolunteer);
router.get("/", authMiddleware, postController.getAllPostsWithinRadius);
router.get("/", authMiddleware, postController.getAllPosts);
router.get("/my-post", authMiddleware, postController.getMyposts);
router.get("/report", authMiddleware, postController.getReportPost);
router.patch("/:postId", authMiddleware, postController.updatePost);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;

const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/join", authMiddleware, volunteerController.joinVolunteer);
router.get("/", authMiddleware, volunteerController.getAllVolunteer);
router.get("/leaderboard", authMiddleware, volunteerController.getVolunteerLeaderboard);
router.get("/me", authMiddleware, volunteerController.getVolunteersByUser);
router.get("/post/:postId", volunteerController.getVolunteersByPost);
router.delete("/:id", volunteerController.deleteVolunteer);
router.patch("/:id", volunteerController.updateVolunteer);

module.exports = router;

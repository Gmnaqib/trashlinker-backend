const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/join", authMiddleware, volunteerController.joinVolunteer);
router.get("/me", authMiddleware, volunteerController.getVolunteersByUser);
router.get("/post/:postId", volunteerController.getVolunteersByPost);
router.delete("/:volunteerId", volunteerController.deleteVolunteer);
router.patch("/:volunteerId", volunteerController.updateVolunteer);

module.exports = router;

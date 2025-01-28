const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");

router.post("/register", volunteerController.registerVolunteer);
router.get("/post/:postId", volunteerController.getVolunteersByPost);
router.get("/user/:userId", volunteerController.getVolunteersByUser);
router.delete("/:volunteerId", volunteerController.deleteVolunteer);

module.exports = router;

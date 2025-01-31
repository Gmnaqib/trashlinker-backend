const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const authMiddleware = require("../../middlewares/authMiddleware");

router.post("/join", authMiddleware, volunteerController.joinVolunteer);
// router.get("/post/:postId", volunteerController.getVolunteersByPost);
// router.get("/user/:userId", volunteerController.getVolunteersByUser);
// router.delete("/:volunteerId", volunteerController.deleteVolunteer);

module.exports = router;

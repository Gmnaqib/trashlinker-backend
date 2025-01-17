const express = require("express");
const router = express.Router();
const { addPost, joinVolunteer } = require("../controller");
const upload = require("../../../utils/upload");

router.post("/", upload.single("image"), addPost);
router.post("/join", joinVolunteer);

module.exports = router;

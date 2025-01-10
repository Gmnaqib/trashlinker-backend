const express = require("express");
const router = express.Router();
const { loginRepository } = require("../repository");

router.post("/login", loginRepository);
module.exports = router;

const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../repository/index');


router.get('/ini-user', getAllUsers);

module.exports = router;
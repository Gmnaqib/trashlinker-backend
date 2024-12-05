const express = require('express');
const router = express.Router();
const {getAllUsers} = require('../repository/index');

router.get('/halo', getAllUsers);

module.exports = router;
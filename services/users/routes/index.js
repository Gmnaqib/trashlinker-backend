const express = require('express');
const router = express.Router();
const {addUser} = require('../controller');


// router.get('/ini-user', getAllUsers);
router.post('/registration', addUser);

module.exports = router;
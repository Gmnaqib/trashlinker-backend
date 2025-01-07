const express = require('express');
const router = express.Router();
const {addPost} = require('../controller');


// router.get('/ini-user', getAllUsers);
router.post('/post', addPost);
// router.get('/post', addPost);

module.exports = router;
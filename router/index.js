const express = require('express');
const router = express.Router();


const userRoutes = require('./../services/users/routes/index');

router.use('/user', userRoutes);

module.exports = router;


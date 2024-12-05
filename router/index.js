const express = require('express');
const router = express.Router();


const userRoutes = require('./../services/users/routes/index');


router.get('/', (req, res) => {
    res.json({ message: 'Halo, selamat datang di API users' });
});
router.use('/user', userRoutes);

module.exports = router;


const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

module.exports = router;

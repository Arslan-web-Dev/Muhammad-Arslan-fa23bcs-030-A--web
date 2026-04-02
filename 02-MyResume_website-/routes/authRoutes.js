const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/me', authMiddleware, authController.getMe);
router.get('/all-users', authMiddleware, authController.getAllUsers); // Get all registered users

module.exports = router;

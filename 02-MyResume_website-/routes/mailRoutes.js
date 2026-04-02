const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');
const authMiddleware = require('../middleware/authMiddleware');

// require authentication for all mail endpoints
router.get('/', authMiddleware, mailController.listContacts);
router.post('/send', authMiddleware, mailController.sendEmail);

module.exports = router;
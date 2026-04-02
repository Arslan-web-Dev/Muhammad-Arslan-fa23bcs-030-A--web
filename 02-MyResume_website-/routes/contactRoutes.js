const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, contactController.getMessages);
router.post('/', contactController.submitMessage);
router.post('/auto-reply', authMiddleware, contactController.generateAutoReply);
router.delete('/:id', authMiddleware, contactController.deleteMessage);

module.exports = router;

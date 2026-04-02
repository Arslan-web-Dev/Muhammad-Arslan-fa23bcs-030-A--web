const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

router.get('/records', recordController.getRecords);
router.post('/records', recordController.createRecord);
router.put('/records/:id', recordController.updateRecord);
router.delete('/records/:id', recordController.deleteRecord);

router.post('/config/database', recordController.switchDatabase);
router.get('/config/status', recordController.getStatus);

module.exports = router;

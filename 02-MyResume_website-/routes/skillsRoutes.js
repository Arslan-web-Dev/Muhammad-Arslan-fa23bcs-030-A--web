const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', skillsController.getSkills);
router.post('/', authMiddleware, skillsController.addSkill);
router.put('/:id', authMiddleware, skillsController.updateSkill);
router.delete('/:id', authMiddleware, skillsController.deleteSkill);

module.exports = router;

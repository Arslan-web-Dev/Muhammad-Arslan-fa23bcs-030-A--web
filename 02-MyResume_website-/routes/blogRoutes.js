const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', blogController.getAllBlogs);
router.post('/', authMiddleware, blogController.createRegularBlog);
router.put('/:id', authMiddleware, blogController.updateRegularBlog);
router.delete('/:id', authMiddleware, blogController.deleteRegularBlog);
router.post('/generate-blog', authMiddleware, blogController.generateBlog);

// API Blog specific routes
router.get('/api', blogController.getBlogs);
router.post('/api', authMiddleware, blogController.createBlog);
router.put('/api/:id', authMiddleware, blogController.updateBlog);
router.delete('/api/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;

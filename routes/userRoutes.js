const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();

// User Routes
router.get('/register', userController.user_register);
router.post('/register', userController.user_register_post);
router.get('/login', userController.user_login);
router.post('/login', userController.user_login_post);
router.get('/logout', userController.user_logout);
router.get('/user-home', requireAuth, userController.user_home);

module.exports = router;
const { Router } = require('express');
const { getProfile, updateProfile } = require('./user.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = Router();


router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router; 
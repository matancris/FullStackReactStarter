const { Router } = require('express');
const passport = require('passport');
const { register, login, getCurrentUser, googleCallback } = require('./auth.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = Router();

// Public routes
router.post('/signup', register);
router.post('/signin', login);

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/signin?error=Google authentication failed'
  }),
  googleCallback
);

// Protected routes
router.get('/currUser', authMiddleware, getCurrentUser);

module.exports = router; 
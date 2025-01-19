const { register: registerService, login: loginService, getCurrentUser: getCurrentUserService } = require('./auth.service');
const { config } = require('../../config');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerService(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await getCurrentUserService(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const googleCallback = async (req, res) => {
  try {
    // Passport has already authenticated the user and attached it to req.user
    const token = req.user.token;
    
    // Redirect to frontend with token
    res.redirect(`${config.clientUrl}/auth/callback?token=${token}`);
  } catch (error) {
    res.redirect(`${config.clientUrl}/signin?error=Google authentication failed`);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  googleCallback
}; 
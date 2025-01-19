const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser, findUserById } = require('../user/user.model');
const { config } = require('../../config');

const register = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password: hashedPassword
  });

  const token = generateToken(user._id);
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  };
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    token
  };
};

const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: '30d'
  });
};

module.exports = {
  register,
  login,
  getCurrentUser
}; 
const { findUserById, findUserByEmail, updateUser } = require('./user.model');

const getProfile = async (userId) => {
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

const updateProfile = async (userId, data) => {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (data.email && data.email !== user.email) {
    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
  }

  const updatedUser = await updateUser(userId, data);
  return {
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email
  };
};

module.exports = {
  getProfile,
  updateProfile
}; 
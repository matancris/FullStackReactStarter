const { getProfile: getProfileService, updateProfile: updateProfileService } = require('./user.service');

const getProfile = async (req, res) => {
  try {
    const user = await getProfileService(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await updateProfileService(req.user.id, { name, email });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile
}; 
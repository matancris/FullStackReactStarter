const { getDb } = require('../../config/database');
const { ObjectId } = require('mongodb');

const usersCollection = () => getDb().collection('users');

const findUserById = async (id) => {
  return await usersCollection().findOne({ _id: new ObjectId(id) });
};

const findUserByEmail = async (email) => {
  return await usersCollection().findOne({ email });
};

const findUserByGoogleId = async (googleId) => {
  return await usersCollection().findOne({ googleId });
};

const createUser = async (userData) => {
  const result = await usersCollection().insertOne({
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return { ...userData, _id: result.insertedId };
};

const updateUser = async (id, data) => {
  const result = await usersCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        ...data,
        updatedAt: new Date() 
      } 
    },
    { returnDocument: 'after' }
  );
  return result.value;
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByGoogleId,
  createUser,
  updateUser
}; 
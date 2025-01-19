const { MongoClient } = require('mongodb');
const { config } = require('./index');

let db = null;

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(config.mongoUri);
    db = client.db();
    console.log('Connected to MongoDB');
    
    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const getDb = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

module.exports = {
  connectToDatabase,
  getDb
}; 
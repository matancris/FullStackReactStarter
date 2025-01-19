const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDatabase } = require('./config/database');
const passport = require('./config/passport');
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const { errorHandler } = require('./middlewares/auth.middleware');
const { config } = require('./config');

// Load environment variables
dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Create Express app
    const app = express();

    // CORS configuration
    app.use(cors({
      origin: config.clientUrl,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(passport.initialize());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);

    // Health check route
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' });
    });

    // Error handling
    app.use(errorHandler);

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 
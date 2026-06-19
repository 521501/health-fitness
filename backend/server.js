const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Environment Variable Validation
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];

// Set default environment if missing
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

requiredEnv.forEach((key) => {
  const value = process.env[key]?.trim();

  if (!value) {
    console.error(`FATAL CONFIG ERROR: Missing ${key} in environment.`);
    process.exit(1);
  }

  if (key === 'MONGO_URI' && !/^mongodb(\+srv)?:\/\//.test(value)) {
    console.error(`FATAL CONFIG ERROR: MONGO_URI must start with "mongodb://" or "mongodb+srv://". Current value is invalid.`);
    process.exit(1);
  }

  // Update the process environment with the sanitized (trimmed) value
  process.env[key] = value;
});

const app = express();

// Security & Logging Middleware
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser
app.use(express.json());

// MongoDB Connection
connectDB();

// API Health Check - Required for production monitoring
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Define Routes
// Auth Routes
app.use((req, res, next) => {
  console.log(`${req.method} request received at ${req.url}`);
  next();
});
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

// Centralized Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});

// Graceful Shutdown - Closes DB and Server properly
const shutdown = () => {
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
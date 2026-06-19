const express = require('express');
const router = express.Router();
const { getAllWorkouts, createWorkout } = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Middleware to protect all routes in this file

router.route('/')
  .get(getAllWorkouts)
  .post(createWorkout);

module.exports = router;
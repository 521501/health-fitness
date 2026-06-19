const Workout = require('../models/Workout');

// @desc    Get all user workouts
// @route   GET /api/workouts
// @access  Private
exports.getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private
exports.createWorkout = async (req, res) => {
  try {
    const { exerciseName, sets, reps, weight } = req.body;

    if (!exerciseName || !sets || !reps || weight === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const workout = await Workout.create({
      userId: req.user.id,
      exerciseName,
      sets,
      reps,
      weight
    });

    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
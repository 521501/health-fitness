const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseName: {
    type: String,
    required: [true, 'Please provide an exercise name'],
    trim: true
  },
  sets: {
    type: Number,
    required: [true, 'Please provide the number of sets']
  },
  reps: {
    type: Number,
    required: [true, 'Please provide the number of reps']
  },
  weight: {
    type: Number,
    required: [true, 'Please provide the weight']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', WorkoutSchema);
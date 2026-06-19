import { Link } from 'react-router-dom';

const EmptyState = () => (
  <div className="rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-8 text-center">
    <h2 className="text-2xl font-bold text-blue-900">No workouts yet</h2>
    <p className="mt-3 text-gray-600">Start building your routine by adding your first workout.</p>
    <Link
      to="/add-workout"
      className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 transition"
    >
      Add Workout
    </Link>
  </div>
);

export default EmptyState;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getWorkouts } from '../services/workoutService';
import DashboardSkeleton from '../components/DashboardSkeleton';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ workoutsCompleted: 0, caloriesBurned: 0, activeDays: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getWorkouts();
        const workouts = response.data || [];
        const workoutsCompleted = workouts.length;
        const caloriesBurned = workouts.reduce((sum, workout) => sum + (workout.calories || 0), 0);
        const activeDays = new Set(workouts.map(workout => new Date(workout.date).toDateString())).size;

        setStats({ workoutsCompleted, caloriesBurned, activeDays });
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8 p-8">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.username || 'User'}!</h1>
        <p className="mt-3 text-gray-600">Here’s your fitness summary for today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Workouts Completed</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{stats.workoutsCompleted}</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Calories Burned</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{stats.caloriesBurned}</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Active Days</p>
          <p className="mt-4 text-4xl font-semibold text-slate-900">{stats.activeDays}</p>
        </div>
      </div>

      {stats.workoutsCompleted === 0 ? (
        <EmptyState />
      ) : (
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Quick Stats</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Weekly workout goal</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{Math.min(stats.workoutsCompleted, 5)}/5</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Avg calories/session</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {stats.workoutsCompleted > 0 ? Math.round(stats.caloriesBurned / stats.workoutsCompleted) : 0}
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Current streak</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stats.activeDays}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import mongoose from 'mongoose';
import { User } from '../models/user.js';
import { Team } from '../models/team.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava@example.com',
        fitnessGoal: 'Build endurance',
        experienceLevel: 'Intermediate',
      },
      {
        name: 'Luis Rivera',
        email: 'luis@example.com',
        fitnessGoal: 'Increase strength',
        experienceLevel: 'Advanced',
      },
      {
        name: 'Mina Patel',
        email: 'mina@example.com',
        fitnessGoal: 'Improve flexibility',
        experienceLevel: 'Beginner',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Night Owls',
        description: 'Early morning runners and cyclists',
        members: users.slice(0, 2).map((user) => user._id.toString()),
      },
      {
        name: 'Core Crew',
        description: 'Strength and mobility focused group',
        members: [users[2]._id.toString()],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date('2026-07-06T06:30:00Z'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 610,
        date: new Date('2026-07-06T18:00:00Z'),
      },
      {
        userId: users[2]._id.toString(),
        type: 'Yoga',
        durationMinutes: 25,
        caloriesBurned: 180,
        date: new Date('2026-07-07T07:15:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id.toString(), points: 1240, rank: 1, streakDays: 8 },
      { userId: users[1]._id.toString(), points: 1185, rank: 2, streakDays: 5 },
      { userId: users[2]._id.toString(), points: 980, rank: 3, streakDays: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Interval Run',
        difficulty: 'Intermediate',
        estimatedDurationMinutes: 30,
        focus: 'Cardio',
        equipment: ['Running shoes'],
      },
      {
        title: 'Full Body Strength Circuit',
        difficulty: 'Advanced',
        estimatedDurationMinutes: 45,
        focus: 'Strength',
        equipment: ['Dumbbells', 'Bench'],
      },
      {
        title: 'Recovery Mobility Flow',
        difficulty: 'Beginner',
        estimatedDurationMinutes: 20,
        focus: 'Flexibility',
        equipment: ['Yoga mat'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

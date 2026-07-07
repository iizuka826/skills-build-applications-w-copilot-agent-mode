import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  estimatedDurationMinutes: number;
  focus: string;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  estimatedDurationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  equipment: { type: [String], default: [] },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: [String], default: [] },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);

import { Schema, Document, model } from 'mongoose';

// TypeScript interface for the Channels subdocument
interface Channels {
  logsChannel: string;
  DevAnnouncements: string;
}

// Full document interface
export interface UniverseActivityDocument extends Document {
  GuildID: number;
  Channels: Channels;
}

// Mongoose schema for Channels
const ChannelsSchema = new Schema<Channels>({
  logsChannel: { type: String },
  DevAnnouncements: { type: String },
});

// Mongoose schema for UniverseActivity
const UniverseActivitySchema = new Schema<UniverseActivityDocument>({
  GuildID: { type: Number },
  Channels: { type: ChannelsSchema },
});

export default model<UniverseActivityDocument>('GuildConfigs', UniverseActivitySchema);

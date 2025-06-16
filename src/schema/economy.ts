import { Schema, Document, model } from 'mongoose';

// Interface for the Balance subdocument
interface Balance {
  userId: string;
  balance: number;
  position?: string; // Marked as optional
}

// Full document interface
export interface UniverseActivityDocument extends Document {
  GuildID: number;
  coinName?: string;
  cRate?: number;
  balance?: Balance[];
}

// Balance sub-schema
const balanceSchema = new Schema<Balance>(
  {
    userId: { type: String, required: true },
    balance: { type: Number, required: true },
    position: { type: String }
  }
);

// Main schema
const UniverseActivitySchema = new Schema<UniverseActivityDocument>({
  GuildID: { type: Number, required: true },
  coinName: { type: String },
  cRate: { type: Number },
  balance: { type: [balanceSchema], default: [] }
});

export default model<UniverseActivityDocument>('Economy', UniverseActivitySchema);

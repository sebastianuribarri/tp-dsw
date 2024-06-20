import { Schema, model } from "mongoose";
import { competitionSchema } from "../../Competition/infrastructure/competition.schema.js";
import { teamSchema } from "../../Team/infrastructure/team.schema.js";

export const standingSchema = new Schema({
  competition: { type: competitionSchema, require: true },
  team: { type: teamSchema, require: true },
  points: { type: Number },

  goalsDiff: { type: Number },

  group: { type: String },

  description: { type: String },
});

const standingModel = model("standings", standingSchema);
export default standingModel;

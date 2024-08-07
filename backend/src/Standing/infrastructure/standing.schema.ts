import { Schema, model } from "mongoose";
import { competitionSchema } from "../../Competition/infrastructure/competition.schema.js";
import { teamSchema } from "../../Team/infrastructure/team.schema.js";

const standingSchema = new Schema({
  team: { type: teamSchema, require: true },
  points: { type: Number },

  goalsDiff: { type: Number },

  group: { type: String },

  description: { type: String },
});

export default standingSchema;

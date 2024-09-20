import { Schema, model } from "mongoose";
import timmerSchema from "../../Shared/infrastructure/timmer.schema.js";
import Competition from "../../Competition/domain/competition.entity.js";
import Team from "../../Team/domain/team.entity.js";
import { match } from "assert";
import { competitionSchema } from "../../Competition/infrastructure/competition.schema.js";
import { teamSchema } from "../../Team/infrastructure/team.schema.js";
import eventSchema from "../../Event/infrastructure/event.schema.js";
import lineUpSchema from "../../LineUp/infraestructure/LineUp.schema.js";

export const matchSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  team: { type: [teamSchema], default: [] },
  competition: { type: competitionSchema, require: true, default: undefined },
  date: { type: Date, require: true, default: undefined },
  status: { type: String, require: true, default: "" },
  home: {
    type: {
      id: { type: Number, require: true, default: 0 },
      name: { type: String, require: true, default: "" },
      logo: { type: String, require: true, default: "" },
    },
    require: true,
    default: undefined,
  },
  away: {
    type: {
      id: { type: Number, require: true, default: 0 },
      name: { type: String, require: true, default: "" },
      logo: { type: String, require: true, default: "" },
    },
    require: true,
    default: undefined,
  },
  goals: {
    type: {
      home: { type: Number, require: true, default: 0 },
      away: { type: Number, require: true, default: 0 },
    },
    require: true,
    default: { home: 0, awat: 0 },
  },
  eventsTimmer: { type: timmerSchema, require: true, default: undefined },
  lineupsTimmer: { type: timmerSchema, require: true, default: undefined },
  events: { type: [eventSchema], require: true, default: [] },
  lineUps: { type: [lineUpSchema], require: true, default: [] },
});

const MatchModel = model("models", matchSchema);

export default MatchModel;

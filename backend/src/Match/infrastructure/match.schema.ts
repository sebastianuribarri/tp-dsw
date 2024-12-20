import { Schema, model } from "mongoose";
import timmerSchema from "../../Shared/infrastructure/timmer.schema.js";
import { teamSchema } from "../../Team/infrastructure/team.schema.js";
import eventSchema from "../../Event/infrastructure/event.schema.js";
import lineUpSchema from "../../LineUp/infraestructure/LineUp.schema.js";
import {
  OptionalNumber,
  RequireNumber,
  RequireString,
} from "../../Shared/infrastructure/schema_types.js";

const matchCompetitionSchema = new Schema({
  id: RequireNumber,
  name: RequireString,
  season: RequireNumber,
  country: RequireString,
  logo: RequireString,
});

export const matchSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  team: { type: [teamSchema], default: [] },
  competition: {
    type: matchCompetitionSchema,
    require: true,
    default: {
      id: 0,
      name: "No competition name",
      season: 0,
      country: "",
      logo: "",
    },
  },
  round: RequireString,
  date: { type: Date, require: true, default: undefined },
  status: { type: String, require: true, default: "" },
  minute: OptionalNumber,
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
    default: { home: 0, away: 0 },
  },
  eventsTimmer: { type: timmerSchema, require: true, default: undefined },
  lineupsTimmer: { type: timmerSchema, require: true, default: undefined },
  events: { type: [eventSchema], require: true, default: [] },
  lineUps: { type: [lineUpSchema], require: true, default: [] },
});

const MatchModel = model("matches", matchSchema);

export default MatchModel;

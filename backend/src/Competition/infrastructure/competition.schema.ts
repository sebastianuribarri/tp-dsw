import { Schema, model } from "mongoose";
import Team from "../../Team/domain/team.entity.js";
import { teamSchema } from "../../Team/infrastructure/team.schema.js";

export const competitionSchema = new Schema({
  standings: { type: [{team: teamSchema,
     points: {type: Number, default: 0},
     goalsDiff: {type: Number, default: 0}, 
     group: {type: String, default: ''},
     description: {type: String , default: ''},}],
     default: []},
  id: { type: Number, require: true, default: 0 },
  start: { type: Date, require: true, default: new Date() },
  end: { type: Date, require: true, default: new Date() },
  name: { type: String, require: true, default: "" },
  type: { type: String, default: "League" },
  logo: { type: String, require: true, default: "" },
  standingsTimmer: {
    type: {
      lastUpdate: { type: Date, default: null },
      active: { type: Boolean, default: true },
    },
    default: undefined,
  },
});

const CompetitionModel = model("competitions", competitionSchema);

export default CompetitionModel;

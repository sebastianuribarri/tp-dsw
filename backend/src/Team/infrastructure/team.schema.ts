import { Schema, model } from "mongoose";
import timmerSchema from "../../Shared/infrastructure/timmer.schema.js";

const playerSchema = new Schema({
  id: { type: Number, default: 0 },
  name: { type: String, default: "" },
  image: { type: String, default: "" },
  number: { type: Number, default: 0 },
  position: { type: String, default: "" },
});
export const teamSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  name: { type: String, require: true, default: "" },
  logo: { type: String, require: true, default: "" },
  playersTimmer: { type: timmerSchema, default: undefined },
  players: { type: [playerSchema], default: [] },
});

const TeamModel = model("teams", teamSchema);

export default TeamModel;

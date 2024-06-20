import { Schema, model } from "mongoose";

export const teamSchema = new Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },
  logo: { type: String, require: true },
});

const TeamModel = model("teams", teamSchema);

export default TeamModel;

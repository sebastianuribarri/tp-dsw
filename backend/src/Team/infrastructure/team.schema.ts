import { Schema, model } from "mongoose";

export const teamSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  name: { type: String, require: true, default: "" },
  logo: { type: String, require: true, default: "" },
});

const TeamModel = model("teams", teamSchema);

export default TeamModel;

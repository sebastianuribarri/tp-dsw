import { Schema, model } from "mongoose";

export const teamSchema = new Schema({
  id: { type: Number, require: true, default: 0 },
  name: { type: String, require: true, default: "" },
  logo: { type: String, require: true, default: "" },
  players: { type: [{ 
    id: { type: Number, default: 0}, 
    name: { type: String, default: "" }, 
    image: { type: String, default: "" }, 
    number: { type: Number, default: 0}, 
    position: { type: String, default: "" }
  }], default: [] }
});

const TeamModel = model("teams", teamSchema);

export default TeamModel;

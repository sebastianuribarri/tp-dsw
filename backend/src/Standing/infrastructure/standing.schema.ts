import { Schema, model } from "mongoose";

const standingSchema = new Schema({
  team: {
    type: {
      id: { type: Number, require: true, default: 0 },
      name: { type: String, require: true, default: "" },
      logo: { type: String, require: true, default: "" },
    },
    require: true,
    default: null,
  },
  points: { type: Number, require: true, default: 0 },

  goalsDiff: { type: Number, require: true, default: 0 },

  group: { type: String, require: true, default: "-" },

  description: { type: String, require: true, default: "-" },
});

export default standingSchema;

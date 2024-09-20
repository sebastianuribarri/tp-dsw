import { Schema } from "mongoose";

const timmerSchema = new Schema({
  lastUpdate: { type: Date },
  mode: { type: String, default: String },
});

export default timmerSchema;

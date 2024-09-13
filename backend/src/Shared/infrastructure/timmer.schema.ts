import { Schema } from "mongoose";

const timmerSchema = new Schema({
  lastUpdate: { type: String, default: null },
  mode: { type: String, default: String },
});

export default timmerSchema;

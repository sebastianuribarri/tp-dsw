import { Schema } from "mongoose";

const timmerSchema = new Schema({
  lastUpdate: { type: String, default: null },
  active: { type: Boolean, default: true },
});

export default timmerSchema;

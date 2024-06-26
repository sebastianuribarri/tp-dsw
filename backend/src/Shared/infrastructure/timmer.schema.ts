import { Schema } from "mongoose";

const timmerSchema = new Schema({
  lastUpdate: { type: Date, default: null },
  active: { type: Boolean, default: true },
});

export default timmerSchema;

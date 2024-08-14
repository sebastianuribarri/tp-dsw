import { Schema, model } from "mongoose";

const predictionSchema = new Schema({
  match: { type: Number, require: true, default: 0 },
  user: { type: String, require: true, default: "" },
  value: { type: String, require: true, default: "" },
});

predictionSchema.index({ match: 1, user: 1 }, { unique: true });

const PredictionModel = model("predictions", predictionSchema);

PredictionModel.createIndexes();
export default PredictionModel;

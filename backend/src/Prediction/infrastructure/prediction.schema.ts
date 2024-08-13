import {Schema, model} from "mongoose";

const predictionSchema = new Schema ({
  match: {type: Number, require: true, default: 0},
  user: {type: String, require: true, default: ""},
  value: {type: String, require: true, default: ""}
});

const PredictionModel = model("predictions", predictionSchema);

export default PredictionModel;
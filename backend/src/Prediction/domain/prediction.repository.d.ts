import matchResult from "./matchResults.entity.ts";
import Prediction from "./prediction.entity.ts";


export interface IPredictionRepository {
  getValuesByMatch(match: number): Promise<matchResult[]>;
  insertOne(prediction: Prediction): Promise<void>;
}

import MatchPredictions from "./matchPredictions.entity.ts";
import Prediction from "./prediction.entity.ts";

export interface IPredictionRepository {
  getValuesByMatch(match: number): Promise<MatchPredictions>;
  insertOne(prediction: Prediction): Promise<void>;
  getPredictionByIds(match: number, user: string): Promise<Prediction>;
}

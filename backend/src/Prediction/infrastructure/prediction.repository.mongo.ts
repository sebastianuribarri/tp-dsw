import { mongo } from "mongoose";
import Prediction from "../domain/prediction.entity.js";
import { IPredictionRepository } from "../domain/prediction.repository.js";
import PredictionModel from "./prediction.schema.js";
import MatchPredictions from "../domain/matchPredictions.entity.js";

export default class PredictionMongoRepository
  implements IPredictionRepository
{
  public async getValuesByMatch(match: number) {
    try {
      const result = await PredictionModel.aggregate([
        { $match: { match: match } }, // Filtra por el valor de match
        {
          $group: {
            _id: "$value", // Agrupa por el campo "value"
            count: { $sum: 1 }, // Cuenta la cantidad de veces que aparece cada valor
          },
        },
      ]);

      console.log("repo result", result);
      const matchPredictions = new MatchPredictions();
      result.forEach((elem) => {
        if (elem._id === "win") matchPredictions.win = elem.count;
        if (elem._id === "draw") matchPredictions.draw = elem.count;
        if (elem._id === "lose") matchPredictions.lose = elem.count;
      });
      return matchPredictions;
    } catch (error) {
      console.error("Error al agrupar las predicciones:", error);
    }
  }

  public async insertOne(prediction: Prediction): Promise<void> {
    try {
      await PredictionModel.create(prediction);
    } catch (err) {
      console.log(err);
    }
  }

  public async getPredictionByIds(matchId: number, userId: string): Promise<Prediction | null> {
    try {
      const prediction = await PredictionModel.findOne({ match: matchId, user: userId });
      return prediction ? prediction.toObject() : null;
    } catch (error) {
      console.error("Error al obtener la predicción:", error);
      return null;
    }
  }
}

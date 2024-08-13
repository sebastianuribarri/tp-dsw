import { mongo } from "mongoose";
import Prediction from "../domain/prediction.entity.js";
import { IPredictionRepository } from "../domain/prediction.repository.js";
import PredictionModel from "./prediction.schema.js";
import matchResult from "../domain/matchResults.entity.js";

export default class PredictionMongoRepository implements IPredictionRepository{
  public async getValuesByMatch(match:number) {
  try {
    const result = await PredictionModel.aggregate([
      { $match: { match: match } }, // Filtra por el valor de match
      { 
        $group: { 
          _id: '$value', // Agrupa por el campo "value"
          count: { $sum: 1 } // Cuenta la cantidad de veces que aparece cada valor
        }
      }
    ]);

    return result.map((elem)=>{
      return new matchResult (
        elem.value,
        elem.count,
      );
    });
  } catch (error) {
    console.error('Error al agrupar las predicciones:', error);
  }
}

  public async insertOne(prediction: Prediction): Promise<void> {
    await PredictionModel.create(prediction);
  }
}


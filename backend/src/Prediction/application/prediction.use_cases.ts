import {error} from "console";
import Prediction from "../domain/prediction.entity.js";
import { IPredictionRepository } from "../domain/prediction.repository.js";
import getValuesByMatch from "../infrastructure/prediction.repository.mongo.js";


export default class PredictionUseCases {
  private predictionDbRepository: IPredictionRepository;

  public constructor (predictionDbRepository: IPredictionRepository) {
    this.predictionDbRepository = predictionDbRepository;
  }

public async getValuesByMatch(matchId: number) {
    const predictions = await this.predictionDbRepository.getValuesByMatch(matchId);
    return predictions;
  }

  public async insertOne (prediction: Prediction) {
    const predictions = await this.predictionDbRepository.insertOne(prediction);
  }

  public async getPredictionByIds(matchId: number, userId: string) {
    const prediction = await this.predictionDbRepository.getPredictionByIds(matchId, userId);
    return prediction;
  }
}

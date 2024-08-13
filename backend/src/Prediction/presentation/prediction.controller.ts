import PredictionUseCases from "../application/prediction.use_cases.js";
import {Response, Request} from "express";
import Prediction, { Result } from "../domain/prediction.entity.js";

export default class PredictionController {
  constructor (private predictionUseCases: PredictionUseCases) {

    this.predictionUseCases = predictionUseCases;
  }

  public async getValuesByMatch (req: Request, res: Response) {
  try {
    const { matchId } = req.params;
    const predictions = await this.predictionUseCases.getValuesByMatch(Number(matchId));
    return res.json(predictions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  }

  public async insertOne (req: Request, res: Response) {
    const prediction= new Prediction(Number(req.params.match), req.params.user, req.params.value as Result)
    await this.predictionUseCases.insertOne(prediction);
    res.status(200).json();
  }
}





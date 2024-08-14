import PredictionUseCases from "../application/prediction.use_cases.js";
import { Response, Request } from "express";
import Prediction, { Result } from "../domain/prediction.entity.js";

export default class PredictionController {
  constructor(private predictionUseCases: PredictionUseCases) {
    this.getValuesByMatch = this.getValuesByMatch.bind(this);
    this.insertOne = this.insertOne.bind(this);
    this.predictionUseCases = predictionUseCases;
  }

  public async getValuesByMatch(req: Request, res: Response) {
    try {
      const { matchId } = req.params;
      const predictions = await this.predictionUseCases.getValuesByMatch(
        Number(matchId)
      );
      return res.json(predictions);
    } catch (error) {
      console.log(error, "ERROR EN CONTROLLER");
      return res.status(500).json({ message: error.message });
    }
  }

  public async insertOne(req: Request, res: Response) {
    const prediction = new Prediction(
      Number(req.body.match),
      req.body.user,
      req.body.value as Result
    );
    console.log("prectiction on controller", prediction);
    await this.predictionUseCases.insertOne(prediction);
    res.status(200).json();
  }
}

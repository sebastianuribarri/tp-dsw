import request from "supertest";
import express, { Request, Response } from "express";
import PredictionController from "../src/Prediction/presentation/prediction.controller";
import PredictionUseCases from "../src/Prediction/application/prediction.use_cases";
import Prediction, { Result } from "../src/Prediction/domain/prediction.entity";

// Mock para la dependencia PredictionUseCases
const mockPredictionUseCases = {
  insertOne: jest.fn(),
};

// Crear app de Express para pruebas
const app = express();
app.use(express.json());

const predictionController = new PredictionController(mockPredictionUseCases as unknown as PredictionUseCases);
app.post("/predictions", predictionController.insertOne);

describe("PredictionController.insertOne", () => {
  test("debería crear una predicción correctamente", async () => {
    const predictionPayload = {
      match: 42,
      user: "user123",
      value: "win" as Result,
    };

    mockPredictionUseCases.insertOne.mockResolvedValueOnce(predictionPayload);

    const response = await request(app)
      .post("/predictions")
      .send(predictionPayload);

    expect(response.status).toBe(200);
    expect(mockPredictionUseCases.insertOne).toHaveBeenCalledWith(expect.any(Prediction));
  });

  test("debería devolver un error si falta un campo obligatorio", async () => {
    const invalidPayload = {
      match: 42,
      user: "user123",
      // Falta el campo "value"
    };

    const response = await request(app)
      .post("/predictions")
      .send(invalidPayload);

    expect(response.status).toBe(500); // Ajustar el código de error si necesario
    expect(mockPredictionUseCases.insertOne).not.toHaveBeenCalled();
  });
});
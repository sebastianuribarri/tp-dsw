import request from "supertest";
import express from "express";
import PredictionController from "../src/Prediction/presentation/prediction.controller";
import PredictionUseCases from "../src/Prediction/application/prediction.use_cases";
import Prediction, { Result } from "../src/Prediction/domain/prediction.entity";

// Mock para la dependencia PredictionUseCases
const mockPredictionUseCases = {
  insertOne: jest.fn(),
};

// Crear app de Express para pruebas
const app = express();
app.use(express.json()); // Asegúrate de que esté aquí para procesar JSON

// Instanciar el controlador con el mock
const predictionController = new PredictionController(
  mockPredictionUseCases as unknown as PredictionUseCases
);
app.post("/api/predictions", predictionController.insertOne); // Ruta del test

// Descripción de las pruebas
describe("PredictionController.insertOne", () => {
  // Limpiar los mocks antes de cada prueba
  beforeEach(() => {
    jest.clearAllMocks(); // Resetea los mocks entre cada prueba
  });

  // Test de creación de predicción
  test("debería crear una predicción correctamente", async () => {
    const predictionPayload = {
      match: 42,
      user: "user123",
      value: "win" as Result, // Este test pasa cuando el 'value' es válido
    };

    // Simula la respuesta del método insertOne
    mockPredictionUseCases.insertOne.mockResolvedValueOnce(predictionPayload);

    // Realiza la solicitud POST
    const response = await request(app)
      .post("/api/predictions")
      .send(predictionPayload);

    // Verifica que la respuesta tenga el estado 200
    expect(response.status).toBe(200);

    // Verifica que insertOne fue llamado con una instancia de Prediction
    expect(mockPredictionUseCases.insertOne).toHaveBeenCalledWith(
      expect.any(Prediction)
    );
  });

  // Test para el caso donde falta un campo obligatorio
  test("debería devolver un error si falta un campo obligatorio", async () => {
    const invalidPayload = {
      match: 42,
      user: "user123",
      // Falta el campo "value"
    };

    // Realiza la solicitud POST sin el campo 'value'
    const response = await request(app)
      .post("/api/predictions")
      .send(invalidPayload);

    // Verifica que la respuesta sea un error 400
    expect(response.status).toBe(400);

    // Verifica que el método insertOne no haya sido llamado
    expect(mockPredictionUseCases.insertOne).not.toHaveBeenCalled();
  });
});

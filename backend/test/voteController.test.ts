import request from "supertest";
import express, { Request, Response } from "express";
import VoteController from "../src/Vote/presentation/vote.controller";
import VoteUseCases from "../src/Vote/application/vote.use_cases";
import Vote from "../src/Vote/domain/vote.entity"; // Eliminar la extensión .ts

// Mock para la dependencia VoteUseCases
const mockVoteUseCases = {
  createVote: jest.fn(),
};

// Crear app de Express para pruebas
const app = express();
app.use(express.json());

const voteController = new VoteController(mockVoteUseCases as unknown as VoteUseCases);
app.post("/votes", voteController.createVote);

describe("VoteController.createVote", () => {
  test("debería crear un voto correctamente", async () => {
    const votePayload = {
      player: {
        id: 1,
        name: "John Doe",
        image: "image.jpg",
        number: 10,
        position: "Forward",
      },
      user: "user123",
      match: 42,
    };

    mockVoteUseCases.createVote.mockResolvedValueOnce(votePayload);

    const response = await request(app)
      .post("/votes")
      .send(votePayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(votePayload);
    expect(mockVoteUseCases.createVote).toHaveBeenCalledWith(expect.any(Vote));
  });

  test("debería devolver un error si falta un campo obligatorio", async () => {
    const invalidPayload = {
      player: {
        id: 1,
        name: "John Doe",
        image: "image.jpg",
        number: 10,
        position: "Forward",
      },
      user: "user123",
      // Falta el campo "match"
    };

    const response = await request(app)
      .post("/votes")
      .send(invalidPayload);

    expect(response.status).toBe(400); // Ajustar el código de error a 400
    expect(response.body).toEqual({ message: "Missing required fields" }); // Ajustar el mensaje de error
    expect(mockVoteUseCases.createVote).not.toHaveBeenCalled();
  });
});
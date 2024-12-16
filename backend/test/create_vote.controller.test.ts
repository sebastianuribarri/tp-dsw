import VoteController from "../src/Vote/presentation/vote.controller";
import VoteUseCases from "../src/Vote/application/vote.use_cases";
import Vote from "../src/Vote/domain/vote.entity";
import { Request, Response } from "express";
import { IVoteRepository } from "../src/Vote/domain/vote.repository";

describe("VoteController - createVote", () => {
  let mockVoteRepository: jest.Mocked<IVoteRepository>;
  let voteUseCases: VoteUseCases;
  let voteController: VoteController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockVoteRepository = {
      findByMatch: jest.fn(),
      insertOne: jest.fn(),
      getVoteByIds: jest.fn(),
    };

    voteUseCases = new VoteUseCases(mockVoteRepository);

    voteUseCases.createVote = jest.fn();

    voteController = new VoteController(voteUseCases);

    req = {
      body: {
        player: {
          id: 1,
          name: "Player 1",
          image: "player1.png",
          number: 10,
          position: "Defender",
        },
        user: "user123",
        match: 123,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = {}; // Missing required fields

    await voteController.createVote(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing required fields",
    });
  });

  it("should call createVote in the use case with correct parameters", async () => {
    await voteController.createVote(req as Request, res as Response);

    expect(voteUseCases.createVote).toHaveBeenCalledTimes(1);
    expect(voteUseCases.createVote).toHaveBeenCalledWith(expect.any(Vote));
    expect(res.json).toHaveBeenCalledWith(expect.any(Vote));
  });
  it("should return 500 if an error occurs", async () => {
    (voteUseCases.createVote as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await voteController.createVote(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Internal server error",
    });
  });
});

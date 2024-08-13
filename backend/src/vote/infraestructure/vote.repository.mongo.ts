import { mongo } from "mongoose";
import Vote from "../domain/vote.entity.js";
import { IVoteRepository } from "../domain/vote.repository.js";
import VoteModel from "./vote.schema.js";
import { MatchResult } from "../domain/matchresult.entity.js";

export default class VoteMongoRepository implements IVoteRepository {
  

  public async findByMatch(match: number) {
    try {
      
    const result = await VoteModel.aggregate([
      { $match: { match: match } }, // Filtra por el valor de match
      { 
        $group: { 
          _id: '$player', // Agrupa por el campo "value"
          count: { $sum: 1 } // Cuenta la cantidad de veces que aparece cada valor
        }
      }
    ]);

    return result.map((elem ) => {return new MatchResult({
        player: elem.player,
        amount: elem.count,
    }) } )
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async insertOne(vote: Vote): Promise<void> {
    await VoteModel.create(vote);
  }

}

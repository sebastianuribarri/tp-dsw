import Player from "../../Player/domain/player.entity.js";
import MatchBestPlayer from "../domain/matchBestPlayer.entity.js";
import Vote from "../domain/vote.entity.js";
import { IVoteRepository } from "../domain/vote.repository.js";
import VoteModel from "./vote.schema.js";

export default class VoteMongoRepository implements IVoteRepository {
  public async findByMatch(match: number) {
    try {
      const result = await VoteModel.aggregate([
        { $match: { match: match } }, // Filtra por el valor de match
        {
          $group: {
            _id: "$player.id", // Agrupa por el campo "value"
            name: { $first: "$player.name" }, // Obtiene el nombre del jugador
            image: { $first: "$player.image" }, // Obtiene la imagen del jugador
            number: { $first: "$player.number" }, // Obtiene el número del jugador
            position: { $first: "$player.position" }, // Obtiene la posición del jugador
            count: { $sum: 1 }, // Cuenta la cantidad de veces que aparece cada valor
          },
        },
      ]);

      return result.map((elem) => {
        console.log(elem);
        return new MatchBestPlayer({
          player: new Player({
            id: Number(elem._id),
            name: String(elem.name),
            image: String(elem.image),
            number: Number(elem.number),
            position: String(elem.position),
          }),
          amount: elem.count,
        });
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository:", err);
    }
  }

  public async insertOne(vote: Vote): Promise<void> {
    await VoteModel.create(vote);
  }
}

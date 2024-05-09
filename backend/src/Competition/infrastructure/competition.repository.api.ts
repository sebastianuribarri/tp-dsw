import { apiResponse } from "../../middlewares/api-football.js";
import CompetitionRepository from "../domain/competition.repository.js";
import Competition from "../domain/competiton.entity.js";

export default class CompetitionApiRepository implements CompetitionRepository {
  public async findAll() {
    try {
      const res = await apiResponse("leagues?country=Argentina&current=true");
      console.log(res.response);
      return res.response.map((elem) => new Competition(elem)); // crear una instancia Competition por cada elemento
    } catch (err) {
      console.log("ocurrio un error");
      new Error("Error en la consulta a API:");
    }
  }
}

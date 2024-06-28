import ICompetitionRepository from "../domain/competition.repository.js";
import CompetitionModel from "./competition.schema.js";
import Competition, { CompetitionDetail } from "../domain/competiton.entity.js";
import Standing from "../domain/standing.entity.js";
import Team from "../../Team/domain/team.entity.js";

export default class CompetitionMongoRepository
  implements ICompetitionRepository
{
  public async findAll(): Promise<CompetitionDetail[] | null> {
    try {
      const mongoCompetitions = await CompetitionModel.find();

      return mongoCompetitions.map((competition) => {
        const standings = competition.standings.map((standing)=> {
          const team = new Team({
            id: standing.team.id,
            name: standing.team.name,
            logo: standing.team.logo,


          })
          return new Standing({
            team: team,
            goalsDiff: standing.goalsDiff,
            group: standing.group,
            description: standing.description,
            points: standing.points
          })
        })
      
        return new CompetitionDetail({
          id: competition.id,
          start: competition.start,
          end: competition.end,
          name: competition.name,
          type: competition.type,
          logo: competition.logo,
          standingsTimmer: competition.standingsTimmer,
        }, standings);
      });
    } catch (err) {
      console.log("ocurrio un error en MongoRepository(findAll):", err);
    }
  }

  public async findById(id: number): Promise<CompetitionDetail | null> {
    const competition = await CompetitionModel.findOne({ id: id });
    const standings = competition.standings.map((standing ) =>  {
      
      const team = new Team({
      id: standing.team.id,
      name: standing.team.name,
      logo: standing.team.logo,


    })
    return new Standing({
      team: team,
      goalsDiff: standing.goalsDiff,
      group: standing.group,
      description: standing.description,
      points: standing.points
    })
  })
    return new CompetitionDetail({
      id: competition.id,
      start: competition.start,
      end: competition.end,
      name: competition.name,
      type: competition.type,
      logo: competition.logo,
      standingsTimmer: competition.standingsTimmer,

    }, standings );
  }

  public async insertOne(competition: Competition): Promise<void> {
    await CompetitionModel.create(competition);
  }
  public async updateOne(
    id: number,
    newData: CompetitionDetail
  ): Promise<CompetitionDetail | null> {
    return await CompetitionModel.findOneAndUpdate({ id: id }, newData, {
      new: true,
    });
  }
}

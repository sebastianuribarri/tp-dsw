import ICompetition from "../domain/competition.js";
import {
  ICompetitionApiRepository,
  ICompetitionRepository,
} from "../domain/competition.repository.js";

// cada cuanto se actualizan los datos de las Competitions
const timerInMinutes = 10 * 24 * 60; // 10 dias

let competitionsLastUpdated: Date;
// si pasaron 10 dias desde la lastUpdate, se actualizan los datos consultando a competitionApiRepository
// y los almacena en la base de datos local mediante competitionDbRepository

class competitionStandingsLastUpdate {
  competitionId: number;
  start: Date;
  standingsLastUpdate: Date;
  constructor(competitionStandingsLastUpdate: {
    competitionId: number;
    start: Date;
  }) {}
}

let competitionsStandingsLastUpdate: competitionStandingsLastUpdate[];

export default class CompetitionUseCases {
  lastUpdate: Date;

  public constructor(
    public competitionApiRepository: ICompetitionApiRepository,
    public competitionDbRepository: ICompetitionRepository
  ) {
    // para obtener los datos actualizados
    this.competitionApiRepository = competitionApiRepository;
    // para guardar los datos
    this.competitionDbRepository = competitionDbRepository;
    // ultima actualizacion de los datos
  }

  private async isUpdated(timerInMinutes: number, lastUpdate: Date) {
    if (lastUpdate) {
      let now: Date = new Date();
      let difference = (now.getTime() - lastUpdate.getTime()) / (1000 * 60); // tiempo transcurrido en minutos
      console.log(difference, timerInMinutes);
      if (difference < timerInMinutes) {
        console.log("esta actualizado");
        return true;
      } else {
        console.log("hay que actualizar");
        return false;
      }
    } else {
      console.log("no hay registros de ultima actualizacion, hay q actualizar");
      return false;
    }
  }

  private async getNewCompetitionsData() {
    const apiCompetitions = await this.competitionApiRepository.findAll();
    let mongoCompetitions = await this.competitionDbRepository.findAll();

    if (apiCompetitions && mongoCompetitions) {
      for (let i = 0; i < apiCompetitions.length; i++) {
        let founded = false;
        for (let j = 0; j < mongoCompetitions.length; j++) {
          if (apiCompetitions[i].id === mongoCompetitions[j].id) {
            if (apiCompetitions[i].start != mongoCompetitions[j].start) {
              // distintas fechas => actualiza competencia con datos de la nueva temporada
              this.updateCompetitionSeason(
                mongoCompetitions[j],
                apiCompetitions[i].start
              );
            }
            // fechas iguales => no hay cambios, se deja como esta

            founded = true;
            // cuando se encuentra la competencia, se elimina la instancia de la mongoCompetitions,
            // para que no siga comparandola con las demas instancias de apiCompetitions
            mongoCompetitions.splice(j, 1);
            break;
          }
        }
        if (!founded) {
          this.createCompetition(apiCompetitions[i]);
        }
      }
    }
    competitionsLastUpdated = new Date(); // actualiza con fecha actual
    return apiCompetitions;
  }

  public async listAll() {
    const updated = await this.isUpdated(
      timerInMinutes,
      competitionsLastUpdated
    );
    if (updated) {
      return await this.competitionDbRepository.findAll();
    } else {
      return await this.getNewCompetitionsData();
    }
  }

  public async getCompetitionDetail(id: number) {
    const competitionsUpdated = await this.isUpdated(
      timerInMinutes,
      competitionsLastUpdated
    );
    let competitionDetail: ICompetition | null;
    if (competitionsUpdated) {
      // si las Competitions estan actualizadas
      competitionDetail = await this.competitionDbRepository.findById(id);
    } else {
      // sino, actualizar el listado
      const updatedCompetitions = await this.getNewCompetitionsData();
      competitionDetail = updatedCompetitions.find((comp) => comp.id === id);
    }
    if (competitionDetail) {
      // si se encontro la Competition
      const competitionStandingsUpdated = true;
      let competitionStandings;

      if (competitionStandingsUpdated) {
      }
      return competitionDetail;
    } else {
      // no existe
      return;
    }

    // obteniendo los datos de los partidos de la compencia
    // matchesUseCases.listLeagueMatches()
  }

  public async createCompetition(competition: ICompetition) {
    return await this.competitionDbRepository.insertOne(competition);
  }

  public async updateCompetitionSeason(
    oldCompetition: ICompetition,
    seasonStart: Date
  ) {
    return await this.competitionDbRepository.updateOne(oldCompetition.id, {
      start: seasonStart,
    });
  }
}

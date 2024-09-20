export enum TIMMER_MODE {
  NOT_UPDATE = "NOT-U",
  // la info no esta disponible (not coverage) -> nunca se consulta
  PRE_UPDATE = "PRE-U",
  // la info no va a actualizarse aun -> no se consulta
  UPDATE = "U",
  // la info puede recibir actualizaciones -> consultar si es necesario
  POST_UPDATE = "POST-U",
  // la info no va a recibir mas actualizaciones -> consultar solo si la info no esta creada
}

export interface TimmerInput {
  lastUpdate?: Date;
  mode: string;
}

export default abstract class Timmer {
  public lastUpdate: Date;
  public mode: TIMMER_MODE;

  constructor(
    timmer: TimmerInput = { lastUpdate: null, mode: TIMMER_MODE.UPDATE }
  ) {
    this.lastUpdate = timmer.lastUpdate ? new Date(timmer.lastUpdate) : null;
    this.mode = timmer.mode as TIMMER_MODE;
  }

  protected isUpdated(entityTimmer: number) {
    // Case 1) update not allowed -> return true
    if (
      this.mode === TIMMER_MODE.PRE_UPDATE ||
      this.mode === TIMMER_MODE.NOT_UPDATE
    ) {
      console.log(`Timmer in ${this.mode} mode: no update allowed`);
      return true;
    }

    // Case 2) data do not exist -> return false
    if (this.lastUpdate === null) {
      console.log("NO DATA AVAILABLE (need creation)");
      return false;
    }

    let now: Date = new Date();
    let difference = (now.getTime() - this.lastUpdate.getTime()) / (1000 * 60); // tiempo transcurrido en minutos

    // Case 3) data unupdated -> return false
    if (difference > entityTimmer) {
      console.log("DATA UNUPDATED: need update");
      return false;
    }

    // Case 4) data updated -> return true
    console.log("DATA AVAILABLE AND UPDATED: no need update");
    return true;
  }

  protected setUpdate() {
    this.lastUpdate = new Date();
  }

  protected isCreated() {
    // creation not allowed -> return true
    if (
      this.mode === TIMMER_MODE.PRE_UPDATE ||
      this.mode === TIMMER_MODE.NOT_UPDATE
    ) {
      console.log("TIMMER DISABLE: no creation allowed");
      return true;
    }

    // lastUpdate not exist -> info do not exist yet -> return false
    if (this.lastUpdate === null) {
      console.log("NO DATA AVAILABLE: need creation");
      return false;
    }

    // lastUpdate exist -> info exist -> return true
    console.log("DATA CREATED");
    return true;
  }

  protected changeMode(newMode: TIMMER_MODE) {
    this.mode = newMode;
  }
}

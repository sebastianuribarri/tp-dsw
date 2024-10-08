export default class ApiAccount {
  public mail: string;
  public password: string;
  public api_key: string;
  public remainingRequests: number;
  public resetTimeInSeconds: number;
  public lastRequestTime: Date;

  constructor(apiAccount: {
    mail: string;
    password: string;
    api_key: string;
    remainingRequests: number;
    resetTimeInSeconds: number;
    endRequestTime: Date;
  }) {
    this.mail = apiAccount.mail;
    this.password = apiAccount.password;
    this.api_key = apiAccount.api_key;
    this.remainingRequests = apiAccount.remainingRequests;
    this.resetTimeInSeconds = apiAccount.resetTimeInSeconds;
    this.lastRequestTime = apiAccount.endRequestTime;
  }

  public checkReset() {
    // Calculamos la fecha en la que debería resetearse la cuenta
    if (!this.lastRequestTime) return;
    const resetTime = new Date(
      this.lastRequestTime.getTime() + this.resetTimeInSeconds * 1000
    );

    const now: Date = new Date();
    // Si el tiempo de reset ya pasó, restablecemos el remainingRequests
    if (now >= resetTime) {
      this.remainingRequests = 100;
      this.lastRequestTime = null; // Reiniciamos endRequestTime
      this.resetTimeInSeconds = null; // Reiniciamos el resetTimeInSeconds
    }
  }
}

import ApiAccountsUseCases from "./api_account.use_cases.js";
import ApiAccount from "../domain/api_account.entity.js";

class ApiRequester {
  private apiUri: string;
  private apiAccountsUseCases: ApiAccountsUseCases;

  constructor(apiUri: string, apiAccountsUseCases: ApiAccountsUseCases) {
    this.apiUri = apiUri;
    this.apiAccountsUseCases = apiAccountsUseCases;
  }

  public async getResponse(
    endpoint: string,
    parameters?: Record<string, any>
  ): Promise<any | null> {
    const account = await this.apiAccountsUseCases.getAccount();
    if (!account) {
      console.error("API key not available.");
      return null;
    }

    const url = new URL(endpoint, this.apiUri);
    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) =>
        url.searchParams.append(key, String(value))
      );
    }

    const config = {
      method: "GET",
      headers: {
        "x-rapidapi-key": account.api_key,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url.toString(), config);

      if (!response.ok) {
        console.error("HTTP error:", response.status, response.statusText);
        return null;
      }

      // Acceder a los headers devueltos
      account.remainingRequests = Number(
        response.headers.get("x-ratelimit-requests-remaining")
      );
      const resetTimeInSeconds = Number(
        response.headers.get("x-ratelimit-requests-reset")
      );

      const data = await response.json();

      await this.apiAccountsUseCases.updateDayRequests(
        account,
        resetTimeInSeconds
      );

      return data;
    } catch (error) {
      console.error("Error detected:", error.message);
      return null;
    }
  }
}
export default ApiRequester;
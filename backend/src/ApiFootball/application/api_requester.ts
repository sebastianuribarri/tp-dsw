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
      throw new Error("API key not available.");
    }
    console.log("account:", account.mail);

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

    const response = await fetch(url.toString(), config);

    if (!response.ok) {
      console.error(response.status);
      throw new Error("Api fetching error");
    }
    console.log("consulta api exitosa");
    // Acceder a los headers devueltos
    account.remainingRequests = Number(
      response.headers.get("x-ratelimit-requests-remaining")
    );
    account.resetTimeInSeconds = Number(
      response.headers.get("x-ratelimit-requests-reset")
    );

    const data = await response.json();

    await this.apiAccountsUseCases.updateDayRequests(account);

    return data;
  }
}
export default ApiRequester;

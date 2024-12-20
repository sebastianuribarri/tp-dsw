import MongoAtlasDatabase from "./infrastructure/mongo_atlas_db.js";
import ApiAccountsRepository from "./infrastructure/api_account.repository.js";
import ApiAccountsUseCases from "./application/api_account.use_cases.js";
import ApiRequester from "./application/api_requester.js";

export default class ApiFootball {
  private mongoAtlasDatabase: MongoAtlasDatabase;
  private apiAccountsRepository: ApiAccountsRepository;
  private apiAccountsUseCases: ApiAccountsUseCases;
  private apiRequester: ApiRequester;

  constructor(apiUri: string) {
    // Dependency injection
    this.apiAccountsRepository = new ApiAccountsRepository();
    this.apiAccountsUseCases = new ApiAccountsUseCases(
      this.apiAccountsRepository
    );
    this.apiRequester = new ApiRequester(apiUri, this.apiAccountsUseCases);
  }

  public async setup() {
    await this.apiAccountsUseCases.setup();
  }

  public async getResponse(endpoint: string, parameters?: Record<string, any>) {
    return await this.apiRequester.getResponse(endpoint, parameters);
  }
}

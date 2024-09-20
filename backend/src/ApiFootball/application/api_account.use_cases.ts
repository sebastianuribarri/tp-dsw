import ApiAccountsRepository from "../infrastructure/api_account.repository.js";
import ApiAccount from "../domain/api_account.entity.js";

class ApiAccountsUseCases {
  private apiAccountsRepository: ApiAccountsRepository;
  private accounts: ApiAccount[];

  constructor(apiAccountsRepository: ApiAccountsRepository) {
    this.apiAccountsRepository = apiAccountsRepository;
  }

  public async setup() {
    this.accounts = await this.apiAccountsRepository.findAccounts();
  }

  public async getAccount(): Promise<ApiAccount | null> {
    this.accounts.forEach((account) => account.checkReset());

    const validAccounts = this.sortAccounts();

    if (!validAccounts) return null;
    // Retornar la primera cuenta válida
    return validAccounts[0];
  }

  public sortAccounts() {
    const validAccounts = this.accounts.filter(
      (account) => account.remainingRequests > 0
    );

    if (validAccounts.length === 0) {
      return null;
    }

    // Ordenar cuentas priorizando aquellas con más requests restantes y más tiempo antes del reseteo
    validAccounts.sort((a, b) => {
      if (a.remainingRequests !== b.remainingRequests) {
        return b.remainingRequests - a.remainingRequests; // Priorizar más requests restantes
      } else {
        return b.resetTimeInSeconds - a.resetTimeInSeconds; // Priorizar más tiempo antes del reseteo
      }
    });

    return validAccounts;
  }

  public async updateDayRequests(account: ApiAccount): Promise<void> {
    // Si remainingRequests llega a 0, almacenamos la fecha actual

    account.lastRequestTime = new Date();

    console.log(
      `${account.mail} (${account.api_key}): ${account.remainingRequests}`
    );
    await this.apiAccountsRepository.updateAccount(account);
  }
}
export default ApiAccountsUseCases;

import { Db } from "mongodb";
import ApiAccount from "../domain/api_account.entity.js";
import ApiAccountModel from "./api_account.model.js";

class ApiAccountsRepository {
  public async findAccounts(): Promise<ApiAccount[]> {
    const accounts = await ApiAccountModel.find().sort({ day_requests: 1 });

    return accounts.map(
      (account) =>
        new ApiAccount({
          mail: account.mail,
          password: account.password,
          api_key: account.api_key,
          remainingRequests: account.remainingRequests,
          resetTimeInSeconds: account.resetTimeInSeconds,
          endRequestTime: account.endRequestTime,
        })
    );
  }

  public async updateAccount(account: ApiAccount): Promise<void> {
    // Crear un objeto con los campos a actualizar
    const updateFields = {
      remainingRequests: account.remainingRequests,
      endRequestTime: account.lastRequestTime,
      resetTimeInSeconds: account.resetTimeInSeconds,
    };

    await ApiAccountModel.updateOne(
      { api_key: account.api_key },
      { $set: updateFields }
    );
  }
}
export default ApiAccountsRepository;

import { Db } from "mongodb";
import ApiAccount from "../domain/api_account.entity.js";
import MongoAtlasDatabase from "./mongo_atlas_db.js";

class ApiAccountsRepository {
  public db: Db;

  public async findAccounts(): Promise<ApiAccount[]> {
    const collection = this.db.collection("api_accounts");
    const accounts = await collection
      .find()
      .sort({ day_requests: 1 })
      .toArray();
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
    const collection = this.db.collection("api_accounts");

    // Crear un objeto con los campos a actualizar
    const updateFields = {
      remainingRequests: account.remainingRequests,
      endRequestTime: account.lastRequestTime,
      resetTimeInSeconds: account.resetTimeInSeconds,
    };

    await collection.updateOne(
      { api_key: account.api_key },
      { $set: updateFields }
    );
  }
}
export default ApiAccountsRepository;

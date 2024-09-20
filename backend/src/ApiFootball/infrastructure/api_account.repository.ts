import { Db } from "mongodb";
import ApiAccount from "../domain/api_account.entity.js";
import MongoAtlasDatabase from "./mongo_atlas_db.js";

class ApiAccountsRepository {
  public db: Db;

  public async findLastRequestDate(): Promise<Date> {
    const collection = this.db.collection("last_request_date");
    const data = await collection.findOne();
    return data.date;
  }

  public async updateLastRequestDate(date: Date) {
    const collection = this.db.collection("last_request_date");
    await collection.updateOne({}, { $set: { date: date } });
  }

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

    // Usar $set para actualizar los campos especificados
    await collection.updateOne(
      { api_key: account.api_key },
      { $set: updateFields }
    );
  }

  public async updateAccounts(changes: Partial<ApiAccount>[]): Promise<void> {
    const collection = this.db.collection("api_accounts");
    for (const change of changes) {
      await collection.updateOne({ api_key: change.api_key }, { $set: change });
    }
  }
}
export default ApiAccountsRepository;

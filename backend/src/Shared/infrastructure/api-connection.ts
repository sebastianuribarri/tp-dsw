import { MongoClient, Db, ServerApiVersion } from "mongodb";
import { ApiResponse_OK } from "./api_response.js";

// API base URL as a constant
const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3/";

class ApiAccount {
  mail: string;
  password: string;
  api_key: string;
  day_requests: number;
  constructor(apiAccount: {
    mail: string;
    password: string;
    api_key: string;
    day_requests: number;
  }) {
    this.mail = apiAccount.mail;
    this.password = apiAccount.password;
    this.api_key = apiAccount.api_key;
    this.day_requests = apiAccount.day_requests;
  }
}

export default class ApiFootball {
  private baseUrl: string;
  private accounts: ApiAccount[];
  private client: MongoClient;
  private db: Db;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
    const uri =
      "mongodb+srv://sebauribarri:todofulbo@todofulbodb.sfbeehk.mongodb.net/?retryWrites=true&w=majority&appName=TodoFulboDB"; // Replace with your MongoDB Atlas connection string
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  // Method to connect to MongoDB Atlas and get accounts
  async getAccounts(): Promise<ApiAccount[] | null> {
    try {
      await this.client.connect();
      this.db = this.client.db("api_football"); // Replace with your database name
      const collection = this.db.collection("api_accounts");

      // Fetch the API account with the least day_requests (example criteria)
      const accounts = await collection
        .find()
        .sort({ day_requests: 1 })
        .toArray();

      if (accounts) {
        console.log(accounts);

        this.accounts = accounts.map((account) => {
          return new ApiAccount({
            mail: account.mail,
            password: account.password,
            api_key: account.api_key,
            day_requests: account.day_requests,
          });
        });
        return this.accounts;
      } else {
        console.error("No API accounts found.");
        return null;
      }
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      return null;
    }
  }

  // Method to fetch an API key based on criteria from the database
  public getAccount(): ApiAccount | null {
    if (!this.accounts || this.accounts.length === 0) {
      console.error(
        "No accounts available. Please ensure getAccounts() is called first."
      );
      return null;
    }

    // Assuming this.accounts is already sorted by day_requests in ascending order
    const accountWithFewestRequests = this.accounts[0];

    if (accountWithFewestRequests) {
      return accountWithFewestRequests;
    } else {
      console.error("No valid account found.");
      return null;
    }
  }

  // Method to get API response
  async getResponse(
    endpoint: string,
    parameters?: Record<string, any>
  ): Promise<ApiResponse_OK<any> | null> {
    const account = this.getAccount();
    if (!account) {
      console.error("API key not available.");
      return null;
    }

    const url = new URL(endpoint, this.baseUrl);

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

      const data = await response.json();

      await this.updateDayRequests(account);

      if (data.errors && data.errors.length !== 0) {
        console.error("API errors:", data.errors);
        throw new Error(String(data.errors));
      }

      // Resort the accounts array after updating day_requests
      this.accounts.sort((a, b) => a.day_requests - b.day_requests);

      return data as ApiResponse_OK<any>;
    } catch (error) {
      console.error("Error detected:", error.message);
      return null;
    }
  }

  public async updateDayRequests(account: ApiAccount) {
    const collection = this.db.collection("api_accounts");

    account.day_requests++;
    await collection.updateOne(
      { api_key: account.api_key },
      { $set: { day_requests: account.day_requests } }
    );

    console.log(
      `${account.mail} (${account.api_key}): ${account.day_requests}`
    );
  }
}

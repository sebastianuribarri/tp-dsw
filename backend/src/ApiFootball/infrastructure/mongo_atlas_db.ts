import { MongoClient, Db } from "mongodb";

class MongoAtlasDatabase {
  private URI: string;
  private client: MongoClient;

  constructor(url: string) {
    this.URI = url;
    this.client = new MongoClient(this.URI);
  }

  public async connect(): Promise<Db> {
    await this.client.connect();
    console.log("Mongo Atlas database connected");
    return this.client.db("api_football"); // Replace with your database name
  }
}

export default MongoAtlasDatabase;

import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";

class MongoDatabase {
  private URI: string;
  private client: MongoClient;

  constructor(URL: string) {
    this.URI = URL;
    this.client = new MongoClient(this.URI);
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.URI);
    console.log("Mongo Atlas database connected");
  }
}

export default MongoDatabase;

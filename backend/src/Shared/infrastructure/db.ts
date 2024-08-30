import mongo from "mongoose";

const DB_URI = "mongodb://localhost:27017/todofulbo";

class MongoDatabase {
  URL: string;
  constructor(port: number, databaseName: string) {
    this.URL = `mongodb://localhost:${port}/${databaseName}`;
    this.connect = this.connect.bind(this);
  }
  public async connect() {
    console.log("database connected");
    await mongo.connect(this.URL);
  }
}

export default MongoDatabase;

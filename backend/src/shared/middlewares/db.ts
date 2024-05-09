import { connect } from "mongoose";

const DB_URI = "mongodb://localhost:27017/todofulbo";

const dbInit = async () => {
  await connect(DB_URI);
  console.log("Estamos ready?");
};

export default dbInit;

import MongoDatabase from "./Shared/infrastructure/db.js";
import App from "./app.js";
import express from "express";
import cors from "cors";
import ApiFootball from "./ApiFootball/api.js";

// database variables
const db_port = 27017;
const db_name = "tf";

// database setup
const mongoDatabase = new MongoDatabase(db_port, db_name);
await mongoDatabase.connect();

// api setup
const apiFootball = new ApiFootball(
  "https://api-football-v1.p.rapidapi.com/v3/",
  "mongodb+srv://sebauribarri:todofulbo@todofulbodb.sfbeehk.mongodb.net"
);
await apiFootball.setup();

// server variables
const express_server = express().use(express.json());
express_server.use(cors());
const server_port = 5000;

// app setup
const app = new App(express_server, apiFootball);
app.run(server_port);

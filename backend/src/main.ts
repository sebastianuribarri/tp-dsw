import MongoDatabase from "./Shared/infrastructure/db.js";
import App from "./app.js";
import express from "express";
import cors from "cors";
import ApiFootball from "./Shared/infrastructure/api-connection.js";

// database variables
const db_port = 27017;
const db_name = "tf";

// database setup
const mongoDatabase = new MongoDatabase(db_port, db_name);
const mongoConnection = mongoDatabase.connect;

// api setup
const apiFootball = new ApiFootball();
await apiFootball.getAccounts();

// server variables
const express_server = express().use(express.json());
express_server.use(cors());
const server_port = 5000;

// app setup
const app = new App(express_server, apiFootball);
app.run(server_port, mongoConnection);

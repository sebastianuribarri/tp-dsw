import MongoDatabase from "./Shared/infrastructure/db.js";
import App from "./app.js";
import express from "express";
import cors from "cors";
import ApiFootball from "./ApiFootball/api.js";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

// database setup
const mongoDatabase = new MongoDatabase(DB_URL);
await mongoDatabase.connect();

// api setup
const apiFootball = new ApiFootball(
  "https://api-football-v1.p.rapidapi.com/v3/"
);
await apiFootball.setup();

// server variables
const express_server = express().use(express.json());
express_server.use(cors());
const server_port = 5000;

// app setup
const app = new App(express_server, apiFootball);
app.run(server_port);

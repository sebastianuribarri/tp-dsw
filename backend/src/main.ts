import MongoDatabase from "./Shared/infrastructure/db.js";
import App from "./app.js";
import express from "express";
import cors from 'cors'

// database variables
const db_port = 27017;
const db_name = "tf";

// database setup
const mongoDatabase = new MongoDatabase(db_port, db_name);
const mongoConnection = mongoDatabase.connect;

// server variables
const express_server = express().use(express.json());
express_server.use(cors())
const server_port = 5000;

// app setup
const app = new App(express_server);
app.run(server_port, mongoConnection);

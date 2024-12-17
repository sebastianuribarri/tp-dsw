import axios from "axios";
import API_URL from ".";
import { Prediction } from "../types/Prediction";

const url = API_URL + "predictions/";

export const getValuesByMatch = async (matchId: number) =>
  await fetch(url + String(matchId));

export const createPrediction = async (prediction: Prediction) =>
  await axios.post(url, prediction);

export const getPredictionByIds = async (matchId: number, userId: string) =>
  await axios.get(url + `${matchId}/${userId}`);

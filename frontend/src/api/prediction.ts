import axios from "axios";
import API_URL, { getAuthHeaders } from ".";
import { Prediction } from "../types/Prediction";

const url = API_URL + "predictions/";

export const getValuesByMatch = async (matchId: number) => {
  const headers = getAuthHeaders();
  return await fetch(url + String(matchId), { headers });
};

export const createPrediction = async (prediction: Prediction) => {
  const headers = getAuthHeaders();
  return await axios.post(url, prediction, { headers });
};

export const getPredictionByIds = async (matchId: number, userId: string) => {
  const headers = getAuthHeaders();
  return await axios.get(url + `${matchId}/${userId}`, { headers });
};

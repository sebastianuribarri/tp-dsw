import axios from "axios";
import API_URL from "./api_url";
import { Prediction } from "../types/Prediction";

const url = API_URL + "prediction/"

export const getValuesByMatch = async(matchId: number) =>
    await fetch(url + String(matchId));

export const createPrediction = async(prediction: Prediction) =>
    await axios.post(url, prediction)
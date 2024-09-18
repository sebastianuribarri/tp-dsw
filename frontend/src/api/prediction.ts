import axios from "axios";
import { User } from "../types/User";
import API_URL from "./api_url";

const url = API_URL + "prediction/"

export const getValuesByMatch = async(matchId: number) =>
    await fetch(url + String(matchId));

export const insertOnePrediction = async(user: User) =>
    await axios.post(url, user)
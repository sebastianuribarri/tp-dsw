import axios from "axios";
import { User } from "../types/User";
import API_URL from "./api_url";

const url = API_URL + "votes/"

export const getVotesByMatch = async(match: number) =>
    await fetch (url + String(match));

export const createVote = async(user: User) =>
    await axios.post(url, user)
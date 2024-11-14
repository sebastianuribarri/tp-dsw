import axios from "axios";
import API_URL from "./api_url";
import { Vote } from "../types/Vote";

const url = API_URL + "votes/"

export const getVotesByMatch = async(match: number) =>
    await fetch (url + String(match));

export const createVote = async (vote: Vote) =>
    await axios.post(url, vote);

import axios from "axios";
import API_URL from ".";
import { Vote } from "../types/Vote";

const url = API_URL + "votes/";

export const getVotesByMatch = async (match: number) => {
  return await axios.get(`${url}${match}`);
};

export const createVote = async (vote: Vote) => {
  return await axios.post(url, vote);
};

export const getVoteByIds = async (matchId: number, userId: string) => {
  return await axios.get(`${url}${matchId}/${userId}`);
};

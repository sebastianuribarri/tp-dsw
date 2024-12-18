import axios from "axios";
import API_URL, { getAuthHeaders } from ".";
import { Vote } from "../types/Vote";

const url = API_URL + "votes/";

export const getVotesByMatch = async (match: number) => {
  const headers = getAuthHeaders();
  return await axios.get(`${url}${match}`, { headers });
};

export const createVote = async (vote: Vote) => {
  const headers = getAuthHeaders();
  return await axios.post(url, vote, { headers });
};

export const getVoteByIds = async (matchId: number, userId: string) => {
  const headers = getAuthHeaders();
  return await axios.get(`${url}${matchId}/${userId}`, { headers });
};

import axios from "axios";
import { User } from "../types/User";
import API_URL from "./api_url";

const url = API_URL + "user/"

export const registerUser = async (user: User) =>
  await axios.post(url + "/register", user);

export const getUserById = async (id: number ) =>
  await fetch(url + String(id));

export const deleteUser =async (id: number) => 
  await axios.delete (url + String(id) );

export const followTeam = async (user: User) =>
  await axios.put (url + "/follow", user);

export const UnfollowTeam = async (user: User) =>
  await axios.put (url + "/unfollow", user)

export const LoginUser = async (user: User) =>
  await axios.post (url + "/login", user)



  

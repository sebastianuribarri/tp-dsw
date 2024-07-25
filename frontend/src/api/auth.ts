import axios from "axios";
export interface User {username: string; email: string; password: string};
const api = 'http://localhost:5000/api/users'

export const registerRequest = async (user:User) => await axios.post(api + '/register', user)
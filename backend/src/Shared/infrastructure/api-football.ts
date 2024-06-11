import axios from "axios";

import { ApiResponse_OK } from "./api_response.js";

export const apiResponse = async (
  endpoint: string,
  parameters?: object
): Promise<ApiResponse_OK<any> | null> => {
  console.log(parameters);
  let config = {
    method: "get",
    url: "https://v3.football.api-sports.io/" + endpoint,
    params: parameters,
    headers: {
      "x-rapidapi-key": "13ff73ffd9c3222ba9da6d1507b0c3e7",
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  };
  return axios(config)
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      return false;
    });
};

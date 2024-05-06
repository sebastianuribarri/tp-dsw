import axios from "axios";

export const apiResponse: any = (endpoint: string) => {
  let config = {
    method: "get",
    url: "https://v3.football.api-sports.io/" + endpoint,
    headers: {
      "x-rapidapi-key": "13ff73ffd9c3222ba9da6d1507b0c3e7",
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  };
  return axios(config)
    .then(function (response: any) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      return error;
    });
};

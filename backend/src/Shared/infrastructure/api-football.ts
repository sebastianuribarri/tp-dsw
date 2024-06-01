import axios from "axios";

export const apiResponse = async (
  endpoint: string,
  parameters?: object
): Promise<any> | null => {
  let config = {
    method: "get",
    url: "https://v3.football.api-sports.io/" + endpoint,
    qs: parameters,
    headers: {
      "x-rapidapi-key": "13ff73ffd9c3222ba9da6d1507b0c3e7",
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  };
  return axios(config)
    .then(function (response: any) {
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
    });
};

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [matches, setMatches] = useState();
  useEffect(() => {
    fetch("https://v3.football.api-sports.io/fixtures/events?fixture=1158644", {
      method: "GET",
      headers: {
        "x-rapidapi-key": "13ff73ffd9c3222ba9da6d1507b0c3e7",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
        console.log(data);
      });
  }, []);
  return <></>;
}

export default App;

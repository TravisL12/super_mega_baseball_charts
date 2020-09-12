import React, { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import { buildTeams } from "./helper";
import TeamTable from "./TeamTable";

function App() {
  const [teams, setTeams] = useState({});

  useEffect(() => {
    const getStats = () => {
      Papa.parse(smbCsvData, {
        download: true,
        header: true,
        complete: (results) => {
          setTeams(buildTeams(results.data));
        },
      });
    };
    getStats();
  }, []);

  if (!teams) {
    return "Loading...";
  }

  return (
    <div className="App">
      {Object.keys(teams).map((teamName) => (
        <TeamTable key={teamName} name={teamName} players={teams[teamName]} />
      ))}
    </div>
  );
}

export default App;

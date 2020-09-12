import React, { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import { buildTeams } from "./helper";
import TeamTable from "./TeamTable";

function App() {
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState();

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
      {selectedTeam && <h1 className="selected-team-name">{selectedTeam}</h1>}
      <div className="team-list">
        {Object.keys(teams).map((teamName) => (
          <span key={teamName} onClick={() => setSelectedTeam(teamName)}>
            {teamName}
          </span>
        ))}
      </div>
      <div className="selected-team-table">
        {selectedTeam && (
          <TeamTable name={selectedTeam} players={teams[selectedTeam]} />
        )}
      </div>
    </div>
  );
}

export default App;

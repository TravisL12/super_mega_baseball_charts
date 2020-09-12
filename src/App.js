import React, { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import TeamTable from "./TeamTable";
import { uniqBy } from "lodash";
import { createPlayer } from "./helper";

const getTeam = (name, data) => {
  return data.filter(({ team }) => team === name);
};

function App() {
  const [teams, setTeams] = useState({});
  const [selectedTeam, setSelectedTeam] = useState();

  useEffect(() => {
    const getStats = () => {
      Papa.parse(smbCsvData, {
        download: true,
        header: true,
        complete: ({ data }) => {
          const buildPlayers = data.map((player) => createPlayer(player));
          setTeams(buildPlayers);
        },
      });
    };
    getStats();
  }, []);

  if (!teams) {
    return "Loading...";
  }

  const uniqTeams = uniqBy(teams, "team").map(({ team }) => team);

  return (
    <div className="App">
      {selectedTeam && <h1 className="selected-team-name">{selectedTeam}</h1>}
      <div className="team-list">
        {Object.values(uniqTeams).map((teamName) => (
          <span key={teamName} onClick={() => setSelectedTeam(teamName)}>
            {teamName}
          </span>
        ))}
      </div>
      <div className="selected-team-table">
        {selectedTeam && (
          <TeamTable
            name={selectedTeam}
            players={getTeam(selectedTeam, teams)}
          />
        )}
      </div>
    </div>
  );
}

export default App;

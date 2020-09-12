import React, { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import TeamTable from "./TeamTable";
import { uniqBy, values } from "lodash";
import { createPlayer } from "./helper";

const ALL_PLAYERS = "All Players";

const getTeam = (name, data) => {
  if (name === ALL_PLAYERS) {
    return data.map((player) => player);
  }

  return data.filter(({ team }) => team === name);
};

function App() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");

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

  const uniqTeams = uniqBy(teams, "team").map(({ team }) => team);

  return (
    <div className="App">
      {selectedTeam && <h1 className="selected-team-name">{selectedTeam}</h1>}

      <div className="team-list">
        <span
          className="all-players"
          onClick={() => setSelectedTeam(ALL_PLAYERS)}
        >
          All Players
        </span>
        {values(uniqTeams).map((teamName) => (
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
            showAllPlayers={selectedTeam === ALL_PLAYERS}
          />
        )}
      </div>
    </div>
  );
}

export default App;

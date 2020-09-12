import React, { useEffect, useState } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import TeamTable from "./TeamTable";
import { uniqBy } from "lodash";
import { createPlayer } from "./helper";
import FilterTeams from "./FilterTeams";

export const ALL_PLAYERS = "All Players";

const getPlayers = (filters, players) => {
  const teams = players.filter((player) => filters.teams[player.display.team]);
  return [...teams];
};

function App() {
  const [teams, setTeams] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const getStats = () => {
      Papa.parse(smbCsvData, {
        download: true,
        header: true,
        complete: ({ data }) => {
          const buildPlayers = data.map((player) => createPlayer(player));
          const uniqTeams = uniqBy(buildPlayers, "display.team")
            .map(({ display }) => display.team)
            .reduce((acc, team) => {
              acc[team] = false;
              return acc;
            }, {});

          setFilters({ teams: uniqTeams });
          setTeams(buildPlayers);
        },
      });
    };

    getStats();
  }, []);

  const uniqTeams = uniqBy(teams, "display.team").map(
    ({ display }) => display.team
  );

  return (
    <div className="App">
      <h1 className="selected-team-name">Super Mega Baseball 3 Rosters</h1>
      <div className="filter-list">
        <FilterTeams
          teams={uniqTeams}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className="selected-team-table">
        <TeamTable players={getPlayers(filters, teams)} />
      </div>
    </div>
  );
}

export default App;

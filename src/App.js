import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import TeamTable from "./TeamTable";
import {
  createPlayer,
  initialFilters,
  buildChecklist,
  getUniqTeams,
  filterPlayers,
} from "./helper";
import FilterTeams from "./FilterTeams";
import FilterPositions from "./FilterPositions";

function App() {
  const [players, setPlayers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

  const getStats = useCallback(() => {
    Papa.parse(smbCsvData, {
      download: true,
      header: true,
      complete: ({ data }) => {
        const buildPlayers = data.map((player) => createPlayer(player));
        setFilters({
          ...filters,
          teams: buildChecklist(getUniqTeams(buildPlayers)),
        });
        setPlayers(buildPlayers);
      },
    });
  }, [filters]);

  useEffect(() => {
    getStats();
  }, []);

  const pitchers = filterPlayers(filters, players).filter(
    ({ isPitcher }) => isPitcher
  );

  const positionPlayers = filterPlayers(filters, players).filter(
    ({ isPitcher }) => !isPitcher
  );

  return (
    <div className="App">
      <h1 className="selected-team-name">Super Mega Baseball 3 Rosters</h1>
      <div className="filter-list">
        <FilterTeams
          teams={getUniqTeams(players)}
          filters={filters}
          setFilters={setFilters}
        />
        <FilterPositions filters={filters} setFilters={setFilters} />
      </div>

      {/* do radio buttons to switch between player/pitcher tables */}
      <div className="selected-team-table">
        <TeamTable players={positionPlayers} />
        <TeamTable players={pitchers} />
      </div>
    </div>
  );
}

export default App;

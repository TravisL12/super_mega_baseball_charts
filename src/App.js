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
import FilterList from "./FilterList";

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
    // eslint-disable-next-line
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
        <FilterList
          filterAttr="teams"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="positions"
          filters={filters}
          setFilters={setFilters}
        />
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

import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import TeamTable from "./TeamTable";
import PlayerTypeForm from "./PlayerTypeForm";
import { keys } from "lodash";
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
  const [selectedOption, setSelectedOption] = useState("Positions");

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

  const checkPitcherOnly = useCallback(() => {
    const positionFilter = keys(filters.positions).filter(
      (p) => filters.positions[p]
    );
    const onlyPitchers =
      positionFilter.length === 1 && positionFilter[0] === "Pitcher";
    console.log(onlyPitchers);
    setSelectedOption(onlyPitchers ? "Pitchers" : "Positions");
  }, [filters.positions]);

  useEffect(() => {
    checkPitcherOnly();
  }, [checkPitcherOnly]);

  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, []);

  const handlePlayerTableChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const pitchers = filterPlayers(filters, players).filter(
    ({ isPitcher }) => isPitcher
  );

  const positionPlayers = filterPlayers(filters, players).filter(
    ({ isPitcher }) => !isPitcher
  );

  return (
    <div className="App">
      <div className="title-container">
        <div className="title-search">
          <h1>Super Mega Baseball 3 Rosters</h1>
          <input type="text" placeholder="Search Players by name" />
        </div>
        <PlayerTypeForm
          playerCounts={{ pitchers, positionPlayers }}
          selectedOption={selectedOption}
          onChange={handlePlayerTableChange}
        />
      </div>

      <div className="filter-list">
        <FilterList
          filterAttr="positions"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="teams"
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <div className="selected-team-table">
        <TeamTable
          players={selectedOption === "Pitchers" ? pitchers : positionPlayers}
        />
      </div>
    </div>
  );
}

export default App;

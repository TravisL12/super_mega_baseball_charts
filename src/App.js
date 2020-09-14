import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Papa from "papaparse";
import smbCsvData from "./smb_info.csv";
import TeamTable from "./TeamTable";
import PlayerTypeForm from "./PlayerTypeForm";
import { sortBy, keys, uniqBy } from "lodash";
import {
  createPlayer,
  buildChecklist,
  getUniqTeams,
  positionLongList,
} from "./helper";
import FilterList from "./FilterList";
import smbLogo from "./smb_logo.png";

const initialFilters = {
  positions: buildChecklist(positionLongList, true),
  name: "",
};

const filterPlayers = (filters, players) => {
  players = players.filter((player) => filters.teams[player.display.team]);
  players = players.filter((player) => {
    const isPitcher = player.isPitcher && filters.positions["Pitcher"];
    return isPitcher || filters.positions[player.display.position];
  });

  if (filters.name) {
    players = players.filter((player) =>
      player.display.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  return uniqBy(players, "display.name");
};

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
          teams: buildChecklist(sortBy(getUniqTeams(buildPlayers)), true),
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
    setSelectedOption(onlyPitchers ? "Pitchers" : "Positions");
  }, [filters.positions]);

  useEffect(() => {
    checkPitcherOnly();
  }, [checkPitcherOnly]);

  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, []);

  const searchNames = useCallback((event) => {
    event.persist();

    setFilters((prevFilters) => {
      return { ...prevFilters, name: event.target.value };
    });
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
      <div className="title-logo">
        <img alt="Super Mega Baseball Logo" src={smbLogo} />
      </div>

      <div className="title-search">
        <input
          type="text"
          placeholder="Search Players by name"
          onChange={searchNames}
        />
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

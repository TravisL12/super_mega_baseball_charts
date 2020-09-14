import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Papa from 'papaparse';
import smbCsvData from './smb_info.csv';
import TeamTable from './TeamTable';
import PlayerTypeForm from './PlayerTypeForm';
import { sortBy, uniqBy, values } from 'lodash';
import {
  createPlayer,
  buildChecklist,
  getUniqTeams,
  positions,
  pitcherPositions,
} from './helper';
import FilterList from './FilterList';
import smbLogo from './smb_logo.png';

const initialFilters = {
  positions: buildChecklist(values(positions).slice(1), true),
  pitchers: buildChecklist(values(pitcherPositions), true),
  name: '',
};

const filterPlayers = (filters, players) => {
  // Filter team names
  players = players.filter((player) => filters.teams[player.display.team]);

  // Filter positions
  players = players.filter(({ display: { position } }) => {
    const isPitcher = filters.pitchers[position];
    const isPosition = filters.positions[position];
    return isPitcher || isPosition;
  });

  // Filter name search
  if (filters.name) {
    players = players.filter((player) =>
      player.display.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  return uniqBy(players, 'display.name');
};

function App() {
  const [players, setPlayers] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedOption, setSelectedOption] = useState('Positions');

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
    const allPositionFiltersOff = values(filters.positions).every((p) => !p);
    const somePitcherFiltersOn = values(filters.pitchers).some((p) => p);

    setSelectedOption(
      allPositionFiltersOff && somePitcherFiltersOn
        ? 'Pitchers'
        : selectedOption
    );
  }, [filters.positions, filters.pitchers, selectedOption]);

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
        <PlayerTypeForm
          playerCounts={{ pitchers, positionPlayers }}
          selectedOption={selectedOption}
          onChange={handlePlayerTableChange}
        />
        <input
          type="text"
          placeholder="Search Players by name"
          onChange={searchNames}
        />
      </div>

      <div className="filter-list">
        <FilterList
          filterAttr="positions"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterList
          filterAttr="pitchers"
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
          isPitchers={selectedOption === 'Pitchers'}
          players={selectedOption === 'Pitchers' ? pitchers : positionPlayers}
        />
      </div>
    </div>
  );
}

export default App;

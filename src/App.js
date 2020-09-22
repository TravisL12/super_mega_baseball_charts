import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Papa from 'papaparse';
import smbCsvData from './smb_data.csv';
import PlayerTable from './tables/PlayerTable';
import PitcherTable from './tables/PitcherTable';
import TeamTable from './tables/TeamTable';
import PlayerTypeForm from './PlayerTypeForm';
import { sortBy, uniqBy, values } from 'lodash';
import { buildTeams, compileOptions, createPlayer } from './buildPlayer';
import {
  buildChecklist,
  getUniqTeams,
  ALL_POSITIONS,
  SECONDARY_POSITIONS,
  PITCHER_ROLES,
} from './helper';
import FilterList from './FilterList';
import smbLogo from './smb_logo.png';

const initialFilters = {
  positions: buildChecklist(values(ALL_POSITIONS), true),
  positions2: buildChecklist(values(SECONDARY_POSITIONS), true),
  pitchers: buildChecklist(values(PITCHER_ROLES), true),
  name: '',
};

const filterPlayers = (filters, players) => {
  // Filter team names
  players = players.filter((player) => filters.teams[player.display.team]);

  // Filter positions
  players = players.filter(({ display: { position, pitcherRole } }) => {
    const isPitcher = filters.pitchers[pitcherRole];
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

const loadPlayers = (cb) => {
  Papa.parse(smbCsvData, {
    download: true,
    header: true,
    complete: cb,
  });
};

function App() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [selectedOption, setSelectedOption] = useState('Positions');

  useEffect(() => {
    loadPlayers(({ data }) => {
      const options = compileOptions(data);
      const buildPlayers = values(options).map((player) =>
        createPlayer(player)
      );
      const teams = buildTeams(buildPlayers);
      setFilters({
        ...filters,
        teams: buildChecklist(sortBy(getUniqTeams(buildPlayers)), true),
      });
      console.log(teams);
      setTeams(teams);
      setPlayers(buildPlayers);
    });
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

  const getTable = () => {
    switch (selectedOption) {
      case 'Pitchers':
        return <PitcherTable players={pitchers} />;
      case 'Positions':
        return <PlayerTable players={positionPlayers} />;
      case 'Teams':
        return <TeamTable teams={teams} />;
      default:
    }
  };

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

      <div className="selected-team-table">{getTable()}</div>
    </div>
  );
}

export default App;

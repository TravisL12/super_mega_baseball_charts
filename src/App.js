import React, { useEffect, useState, useCallback } from 'react';
import Papa from 'papaparse';
import { partition, sortBy, values } from 'lodash';

import smbCsvData from './smb_data.csv';
import smbLogo from './smb_logo.png';

import PlayerTable from './tables/PlayerTable';
import PitcherTable from './tables/PitcherTable';
import TeamTable from './tables/TeamTable';
import PlayerTypeForm from './PlayerTypeForm';
import Filters from './Filters';

import { buildTeams, compileOptions, createPlayer } from './buildPlayer';
import {
  buildChecklist,
  getUniqTeams,
  initialFilters,
  filterPlayers,
} from './helper';

import {
  AppContainer,
  HeaderContainer,
  DisplayedTableContainer,
} from './styles';

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

  const [pitchers, positionPlayers] = partition(
    filterPlayers(filters, players),
    ({ isPitcher }) => isPitcher
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
    <AppContainer>
      <div className="title-logo">
        <img alt="Super Mega Baseball Logo" src={smbLogo} />
      </div>

      <HeaderContainer>
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
      </HeaderContainer>

      <Filters filters={filters} setFilters={setFilters} />

      <DisplayedTableContainer>{getTable()}</DisplayedTableContainer>
    </AppContainer>
  );
}

export default App;

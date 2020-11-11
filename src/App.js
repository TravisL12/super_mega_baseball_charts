import React, { useEffect, useState, useCallback } from 'react';
import Papa from 'papaparse';
import { partition, sortBy, values } from 'lodash';
import { Switch, Route } from 'react-router-dom';

import PlayerCard from './PlayerCard';
import ComparePlayers from './ComparePlayers';
import PositionTable from './tables/PositionTable';
import PitcherTable from './tables/PitcherTable';
import TeamTable from './tables/TeamTable';
import Header from './Header';
import Filters from './Filters';

import {
  buildTeams,
  compileOptions,
  createPlayer,
} from './utilities/buildPlayer';
import {
  buildChecklist,
  getUniqTeams,
  initialFilters,
  filterPlayers,
} from './utilities/helper';

import { AppContainer, DisplayedTableContainer } from './styles';
import usePlayerModal from './hooks/usePlayerModal';

const loadPlayers = (cb) => {
  Papa.parse(`${process.env.PUBLIC_URL}/smb_data.csv`, {
    download: true,
    header: true,
    complete: cb,
  });
};

function App() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const { setPlayerModal, closePlayerModal, modalPlayer } = usePlayerModal(
    players
  );

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

  const clearSearch = useCallback(() => {
    setFilters((prevFilters) => {
      return { ...prevFilters, name: '' };
    });
  }, [setFilters]);

  const [pitchers, positionPlayers] = partition(
    filterPlayers(filters, players),
    ({ isPitcher }) => isPitcher
  );

  return (
    <AppContainer>
      <div className="title-logo">
        <img
          alt="Super Mega Baseball Logo"
          src={`${process.env.PUBLIC_URL}/smb_logo.png`}
        />
      </div>

      <Header
        playerCounts={{ pitchers, positionPlayers }}
        searchNames={searchNames}
        clearSearch={clearSearch}
        filters={filters}
      />

      <Filters filters={filters} setFilters={setFilters} />

      <DisplayedTableContainer>
        <PlayerCard
          player={modalPlayer}
          isOpen={!!modalPlayer}
          close={closePlayerModal}
        />
        <Switch>
          <Route path="/pitchers">
            <PitcherTable
              setModalPlayer={setPlayerModal}
              modalPlayer={modalPlayer}
              players={pitchers}
            />
          </Route>
          <Route path="/teams">
            <TeamTable teams={teams} />
          </Route>
          <Route path="/compare">
            <ComparePlayers players={players} />
          </Route>
          <Route path="/">
            <PositionTable
              setModalPlayer={setPlayerModal}
              modalPlayer={modalPlayer}
              players={positionPlayers}
            />
          </Route>
        </Switch>
      </DisplayedTableContainer>
    </AppContainer>
  );
}

export default App;

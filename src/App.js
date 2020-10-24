import React, { useEffect, useState, useCallback } from 'react';
import Papa from 'papaparse';
import { partition, sortBy, values } from 'lodash';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import smbCsvData from './smb_data.csv';
import smbLogo from './smb_logo.png';

import PlayerCard from './PlayerCard';
import PlayerTable from './tables/PlayerTable';
import PitcherTable from './tables/PitcherTable';
import TeamTable from './tables/TeamTable';
import Header from './Header';
import Filters from './Filters';

import { buildTeams, compileOptions, createPlayer } from './buildPlayer';
import {
  buildChecklist,
  getUniqTeams,
  initialFilters,
  filterPlayers,
} from './helper';

import { AppContainer, DisplayedTableContainer } from './styles';

const loadPlayers = (cb) => {
  Papa.parse(smbCsvData, {
    download: true,
    header: true,
    complete: cb,
  });
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [modalPlayer, setModalPlayer] = useState(null);
  const query = useQuery();
  const history = useHistory();

  const setPlayerModal = (player) => {
    history.push({ search: `?player=${player.name}` });
    setModalPlayer(player);
  };

  const closePlayerModal = () => {
    history.push({ search: '' });
    setModalPlayer(null);
  };

  useEffect(() => {
    query.get('player');
  }, [modalPlayer]);

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

  const [pitchers, positionPlayers] = partition(
    filterPlayers(filters, players),
    ({ isPitcher }) => isPitcher
  );

  return (
    <AppContainer>
      <div className="title-logo">
        <img alt="Super Mega Baseball Logo" src={smbLogo} />
      </div>

      <Header
        playerCounts={{ pitchers, positionPlayers }}
        searchNames={searchNames}
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
            <PitcherTable setModalPlayer={setPlayerModal} players={pitchers} />
          </Route>
          <Route path="/teams">
            <TeamTable teams={teams} />
          </Route>
          <Route path="/">
            <PlayerTable
              setModalPlayer={setPlayerModal}
              players={positionPlayers}
            />
          </Route>
        </Switch>
      </DisplayedTableContainer>
    </AppContainer>
  );
}

export default App;

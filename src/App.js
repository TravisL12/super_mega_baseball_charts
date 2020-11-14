import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Papa from 'papaparse';
import { partition, sortBy, values } from 'lodash';
import { Switch, Route } from 'react-router-dom';

import PlayerCard from './PlayerCard';
import TeamTable from './tables/TeamTable';
import Header from './Header';
import Filters from './Filters';

import {
  buildTeams,
  compileOptions,
  createPlayer,
} from './utilities/buildPlayer';
import { tableColumnMap, tableHeaders } from './utilities/constants';
import {
  buildChecklist,
  getUniqTeams,
  initialFilters,
  filterPlayers,
} from './utilities/helper';

import { AppContainer, DisplayedTableContainer } from './styles';
import usePlayerModal from './hooks/usePlayerModal';
import PlayerTable from './tables/PlayerTable';

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

  const selectedPlayers = useMemo(
    () => players.filter(({ checked }) => checked),
    [players]
  );

  const addPlayerCompareList = (playerId) => {
    const updatePlayers = [...players];
    const playerIdx = updatePlayers.findIndex(
      (player) => player.id === +playerId
    );
    const selectedPlayer = updatePlayers[playerIdx];

    if (selectedPlayer) {
      updatePlayers[playerIdx].checked = !updatePlayers[playerIdx].checked;
      setPlayers(updatePlayers);
    }
  };

  const toggleCompare = () => {
    if (selectedPlayers.length > 0) {
      setFilters((prevFilters) => {
        return { ...prevFilters, showCompare: !prevFilters.showCompare };
      });
    }
  };

  const clearCompareSelection = () => {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        player.checked = false;
        return player;
      });
    });
    setFilters((prevFilters) => {
      return { ...prevFilters, showCompare: false };
    });
  };

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

      <Filters
        filters={filters}
        setFilters={setFilters}
        selectedPlayers={selectedPlayers}
        clearCompareSelection={clearCompareSelection}
      />

      <DisplayedTableContainer>
        <PlayerCard
          player={modalPlayer}
          isOpen={!!modalPlayer}
          close={closePlayerModal}
        />
        <Switch>
          <Route path="/teams">
            <TeamTable teams={teams} />
          </Route>
          <Route path="/pitchers">
            <PlayerTable
              headers={tableHeaders.pitchers}
              players={pitchers}
              columnNameMap={tableColumnMap.pitchers}
              setModalPlayer={setPlayerModal}
              modalPlayer={modalPlayer}
              addPlayerCompareList={addPlayerCompareList}
              hasSelectedPlayers={selectedPlayers.length === 0}
              toggleCompare={toggleCompare}
              showCompare={filters.showCompare}
              setPlayers={setPlayers}
            />
          </Route>
          <Route path="/">
            <PlayerTable
              headers={tableHeaders.positions}
              players={positionPlayers}
              columnNameMap={tableColumnMap.positions}
              setModalPlayer={setPlayerModal}
              modalPlayer={modalPlayer}
              addPlayerCompareList={addPlayerCompareList}
              hasSelectedPlayers={selectedPlayers.length === 0}
              toggleCompare={toggleCompare}
              showCompare={filters.showCompare}
              setPlayers={setPlayers}
            />
          </Route>
        </Switch>
      </DisplayedTableContainer>
    </AppContainer>
  );
}

export default App;

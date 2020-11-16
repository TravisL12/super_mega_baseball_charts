import React, { useEffect, useState, useMemo } from 'react';
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
import { buildChecklist, getUniqTeams } from './utilities/helper';

import { AppContainer, DisplayedTableContainer } from './styles';
import usePlayerModal from './hooks/usePlayerModal';
import PlayerTable from './tables/PlayerTable';
import useFilters from './hooks/useFilters';

const loadPlayers = (cb) => {
  Papa.parse(`${process.env.PUBLIC_URL}/smb_data.csv`, {
    download: true,
    header: true,
    complete: cb,
  });
};

function App() {
  const [players, setPlayers] = useState([]);
  const {
    filters,
    setFilters,
    filterPlayers,
    addPlayerCompareList,
    toggleCompare,
    updateSort,
    clearCompareSelection,
    searchNames,
    clearSearch,
  } = useFilters();
  const { setPlayerModal, closePlayerModal, modalPlayer } = usePlayerModal(
    players
  );

  useEffect(() => {
    loadPlayers(({ data }) => {
      const options = compileOptions(data);
      const buildPlayers = values(options).map((player) =>
        createPlayer(player)
      );
      setFilters({
        ...filters,
        teams: buildChecklist(sortBy(getUniqTeams(buildPlayers)), true),
      });
      setPlayers(buildPlayers);
    });
    // eslint-disable-next-line
  }, []);

  const selectedPlayers = useMemo(
    () => players.filter(({ id }) => filters.comparePlayerIds.includes(id)),
    [players, filters.comparePlayerIds]
  );

  const [pitchersPlayers, positionPlayers] = partition(
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
        players={positionPlayers}
        pitchers={pitchersPlayers}
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
            <TeamTable teams={buildTeams(players)} />
          </Route>
          <Route path="/pitchers">
            <PlayerTable
              headers={tableHeaders.pitchers}
              players={pitchersPlayers}
              columnNameMap={tableColumnMap.pitchers}
              setModalPlayer={setPlayerModal}
              modalPlayer={modalPlayer}
              addPlayerCompareList={addPlayerCompareList}
              toggleCompare={toggleCompare}
              filters={filters}
              updateSort={updateSort}
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
              toggleCompare={toggleCompare}
              filters={filters}
              updateSort={updateSort}
            />
          </Route>
        </Switch>
      </DisplayedTableContainer>
    </AppContainer>
  );
}

export default App;

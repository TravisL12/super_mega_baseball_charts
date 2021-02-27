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

import { AppContainer, DisplayedTableContainer, Img, Loading } from './styles';
import usePlayerModal from './hooks/usePlayerModal';
import PlayerTable from './tables/PlayerTable';
import useFilters from './hooks/useFilters';
import { TeamContainer } from './styles/Table.style';

const loadPlayers = (cb) => {
  Papa.parse(`${process.env.PUBLIC_URL}/smb_data.csv`, {
    download: true,
    header: true,
    complete: cb,
  });
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
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
      setTeams(buildTeams(buildPlayers));
      setPlayers(buildPlayers);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  const selectedPlayers = useMemo(
    () => players.filter(({ id }) => filters.comparePlayerIds.includes(id)),
    [players, filters.comparePlayerIds]
  );

  const [pitchersPlayers, positionPlayers] = partition(
    filterPlayers(players),
    ({ isPitcher }) => isPitcher
  );

  if (isLoading) {
    return (
      <AppContainer>
        <Loading>
          <Img
            alt="Super Mega Baseball Logo"
            src={`${process.env.PUBLIC_URL}/smb_logo.png`}
          />
        </Loading>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <div className="title-logo">
        <Img
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

      <Switch>
        <Route path="/teams">
          <TeamContainer>
            <TeamTable teams={teams} />
          </TeamContainer>
        </Route>

        <Route path="/">
          <Filters
            filters={filters}
            setFilters={setFilters}
            selectedPlayers={selectedPlayers}
            clearCompareSelection={clearCompareSelection}
            toggleCompare={toggleCompare}
          />

          <PlayerCard
            player={modalPlayer}
            isOpen={!!modalPlayer}
            close={closePlayerModal}
          />
          <DisplayedTableContainer>
            <Route exact path="/pitchers">
              <PlayerTable
                headers={tableHeaders.pitchers}
                players={pitchersPlayers}
                columnNameMap={tableColumnMap.pitchers}
                setModalPlayer={setPlayerModal}
                modalPlayer={modalPlayer}
                addPlayerCompareList={addPlayerCompareList}
                filters={filters}
                updateSort={updateSort}
              />
            </Route>
            <Route exact path="/">
              <PlayerTable
                headers={tableHeaders.positions}
                players={positionPlayers}
                columnNameMap={tableColumnMap.positions}
                setModalPlayer={setPlayerModal}
                modalPlayer={modalPlayer}
                addPlayerCompareList={addPlayerCompareList}
                filters={filters}
                updateSort={updateSort}
              />
            </Route>
          </DisplayedTableContainer>
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
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
import { tableHeaders } from './utilities/constants';
import { buildChecklist, getUniqTeams } from './utilities/helper';

import { AppContainer, DisplayedTableContainer, Img, Loading } from './styles';
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

  const getTable = (isPitcher) => {
    const headers = isPitcher ? tableHeaders.pitchers : tableHeaders.positions;
    const playersValue = isPitcher ? pitchersPlayers : positionPlayers;
    return (
      <PlayerTable
        headers={headers}
        players={playersValue}
        addPlayerCompareList={addPlayerCompareList}
        clearCompareSelection={clearCompareSelection}
        filters={filters}
        updateSort={updateSort}
      />
    );
  };

  return (
    <AppContainer>
      <div className="title-logo">
        <Img
          alt="Super Mega Baseball Logo"
          src={`${process.env.PUBLIC_URL}/smb_logo.png`}
        />
      </div>

      <Header
        playerCount={{
          position: positionPlayers.length,
          pitchers: pitchersPlayers.length,
        }}
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

        <Route path="/about">
          <div>Hope you like the site!</div>
        </Route>

        <Route path="/">
          <Filters
            filters={filters}
            setFilters={setFilters}
            toggleCompare={toggleCompare}
          />
          <Route
            exact
            path="/player/:playerName"
            render={(props) => {
              const name = props.match.params.playerName;
              const player = players.find((player) => player.name === name);
              return <PlayerCard player={player} />;
            }}
          ></Route>
          <DisplayedTableContainer>
            <Route exact path={['/pitchers', '/player/*']}>
              {getTable(true)}
            </Route>
            <Route exact path={['/', '/player/*']}>
              {getTable()}
            </Route>
          </DisplayedTableContainer>
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default App;

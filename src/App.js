import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { sortBy, values } from "lodash";
import { Switch, Route } from "react-router-dom";

import PlayerCard from "./PlayerCard";
import TeamTable from "./tables/TeamTable";
import Header from "./Header";
import Filters from "./Filters";

import {
  buildTeams,
  compileOptions,
  createPlayer,
} from "./utilities/buildPlayer";
import { tableHeaders } from "./utilities/constants";
import { buildChecklist, getUniqTeams } from "./utilities/helper";

import {
  LogoContainer,
  AppContainer,
  DisplayedTableContainer,
  Img,
  Loading,
} from "./styles";
import PlayerTable from "./tables/PlayerTable";
import useFilters from "./hooks/useFilters";

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

  const [pitchersPlayers, positionPlayers] = useMemo(() => {
    const allPlayers = filterPlayers(players);
    const pitchers = allPlayers.filter(({ isPitcher }) => isPitcher);
    return [pitchers, allPlayers];
  }, [players, filterPlayers]);

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
      <LogoContainer>
        <Img
          alt="Super Mega Baseball Logo"
          src={`${process.env.PUBLIC_URL}/smb_logo.png`}
        />
      </LogoContainer>

      <Header
        playerCount={{
          position: positionPlayers.length,
          pitchers: pitchersPlayers.length,
        }}
      />

      <Switch>
        <Route path="/teams">
          <TeamTable teams={teams} />
        </Route>

        <Route path="/">
          <Filters
            filters={filters}
            setFilters={setFilters}
            toggleCompare={toggleCompare}
            searchNames={searchNames}
            clearSearch={clearSearch}
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
            <Route exact path="/pitchers">
              {getTable(true)}
            </Route>
            <Route exact path="/">
              {getTable()}
            </Route>
          </DisplayedTableContainer>
        </Route>
      </Switch>
    </AppContainer>
  );
}

export default App;

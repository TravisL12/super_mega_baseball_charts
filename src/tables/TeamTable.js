import React, { useEffect, useState } from 'react';
import { keys } from 'lodash';
import TeamView from './TeamView';
import {
  StyledTeamList,
  StyledTeamTable,
  StyledTeamListItem,
  Img,
} from '../styles';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const TeamTable = ({ teams }) => {
  const match = useRouteMatch();

  return (
    <StyledTeamTable>
      <StyledTeamList>
        <div>
          {keys(teams).map((team) => (
            <StyledTeamListItem key={team} to={`${match.url}/${team}`}>
              <Img
                alt={`${team} logo`}
                src={`${process.env.PUBLIC_URL}/team_logos/${team}.png`}
              />
              <span>{teams[team].name}</span>
            </StyledTeamListItem>
          ))}
        </div>
      </StyledTeamList>
      <Switch>
        <Route path={`${match.path}/:teamName`}>
          <TeamView teams={teams} />
        </Route>
      </Switch>
    </StyledTeamTable>
  );
};

export default TeamTable;

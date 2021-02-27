import React from 'react';
import { keys } from 'lodash';
import TeamPlayerDetail from './TeamPlayerDetail';
import {
  StyledTeamList,
  StyledTeamTable,
  StyledTeamListItem,
  Img,
  StyledTeamView,
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
        <Route
          path={`${match.path}/:teamName`}
          render={(props) => {
            const team = teams[props.match.params.teamName];

            return (
              <StyledTeamView>
                {team.players.map((player) => (
                  <TeamPlayerDetail player={player} />
                ))}
              </StyledTeamView>
            );
          }}
        />
      </Switch>
    </StyledTeamTable>
  );
};

export default TeamTable;

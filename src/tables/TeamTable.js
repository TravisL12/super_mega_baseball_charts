import React from 'react';
import { keys, partition } from 'lodash';
import TeamPlayerDetail from './TeamPlayerDetail';
import {
  StyledTeamList,
  StyledTeamTable,
  StyledTeamListItem,
  StyledTeamView,
  StyledTeamViewPitchers,
  Img,
} from '../styles';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const TeamTable = ({ teams }) => {
  const match = useRouteMatch();

  return (
    <StyledTeamTable>
      <StyledTeamList>
        {keys(teams).map((team) => (
          <StyledTeamListItem
            key={team}
            to={`${match.url}/${team}`}
            activeClassName="active"
          >
            <Img
              alt={`${team} logo`}
              src={`${process.env.PUBLIC_URL}/team_logos/${team}.png`}
            />
            <span>{teams[team].name}</span>
          </StyledTeamListItem>
        ))}
      </StyledTeamList>
      <Switch>
        <Route
          path={`${match.path}/:teamName`}
          render={(props) => {
            const team = teams[props.match.params.teamName];
            const [pitchersPlayers, positionPlayers] = partition(
              team.players,
              ({ isPitcher }) => isPitcher
            );

            return (
              <>
                <StyledTeamView>
                  <h3>Position Players</h3>
                  {positionPlayers.map((player) => (
                    <TeamPlayerDetail player={player} />
                  ))}
                </StyledTeamView>
                <StyledTeamViewPitchers>
                  <h3>Pitchers</h3>
                  {pitchersPlayers.map((player) => (
                    <TeamPlayerDetail player={player} />
                  ))}
                </StyledTeamViewPitchers>
              </>
            );
          }}
        />
      </Switch>
    </StyledTeamTable>
  );
};

export default TeamTable;

import React from "react";
import { keys } from "lodash";
import {
  StyledTeamList,
  StyledTeamTable,
  StyledTeamListItem,
  Img,
} from "../styles";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import TeamView from "./TeamView";

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
          </StyledTeamListItem>
        ))}
      </StyledTeamList>
      <Switch>
        <Route exact path={`${match.path}/:teamName`}>
          <TeamView teams={teams} />
        </Route>
      </Switch>
    </StyledTeamTable>
  );
};

export default TeamTable;

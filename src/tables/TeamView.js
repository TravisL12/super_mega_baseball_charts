import React from "react";
import { partition } from "lodash";
import TeamPlayerDetail from "./TeamPlayerDetail";
import {
  StyledTeamView,
  StyledTeamViewPitchers,
  DetailContainer,
} from "../styles";
import { useRouteMatch } from "react-router-dom";

const TeamView = ({ teams }) => {
  const match = useRouteMatch();
  const team = teams[match.params.teamName];
  const [pitchersPlayers, positionPlayers] = partition(
    team.players,
    ({ isPitcher }) => isPitcher
  );

  return (
    <>
      <StyledTeamView>
        <h3>Position Players</h3>
        <DetailContainer>
          {positionPlayers.map((player) => (
            <TeamPlayerDetail key={player.name} player={player} />
          ))}
        </DetailContainer>
      </StyledTeamView>
      <StyledTeamViewPitchers>
        <h3>Pitchers</h3>
        <DetailContainer>
          {pitchersPlayers.map((player) => (
            <TeamPlayerDetail key={player.name} player={player} />
          ))}
        </DetailContainer>
      </StyledTeamViewPitchers>
    </>
  );
};

export default TeamView;

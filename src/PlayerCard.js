import React from "react";
import { useHistory } from "react-router-dom";
import { InnerCard, PlayerCardContainer } from "./styles";
import TeamPlayerDetail from "./tables/TeamPlayerDetail";

const PlayerCard = ({ player }) => {
  const history = useHistory();
  return (
    !!player && (
      <PlayerCardContainer>
        <InnerCard>
          <TeamPlayerDetail height={"500px"} player={player} />
          <button
            className="close-btn"
            onClick={() => {
              if (player.pitcherRole) {
                history.push("/pitchers");
              } else {
                history.push("/");
              }
            }}
          >
            Close
          </button>
        </InnerCard>
      </PlayerCardContainer>
    )
  );
};

export default PlayerCard;

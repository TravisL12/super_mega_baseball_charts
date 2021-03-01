import React from 'react';
import { Link } from 'react-router-dom';
import { InnerCard, PlayerCardContainer } from './styles';
import TeamPlayerDetail from './tables/TeamPlayerDetail';

const PlayerCard = ({ player }) => {
  return (
    !!player && (
      <PlayerCardContainer>
        <InnerCard>
          <TeamPlayerDetail height={'500px'} player={player} />
          <Link className="close-btn" to="/">
            Close
          </Link>
        </InnerCard>
      </PlayerCardContainer>
    )
  );
};

export default PlayerCard;

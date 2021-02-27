import React from 'react';
import { Link } from 'react-router-dom';
import { InnerCard, PlayerCardContainer, SkillRating } from './styles';
import TeamPlayerDetail from './tables/TeamPlayerDetail';

export const PlayerSkill = ({ skill, rating }) => {
  return (
    <div className="player-skill">
      <span>{skill}</span>
      <span>
        <SkillRating width={rating} />
      </span>
    </div>
  );
};

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

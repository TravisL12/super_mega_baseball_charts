import React from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  return (
    !!player && (
      <PlayerCardContainer>
        <InnerCard>
          <TeamPlayerDetail height={'500px'} player={player} />
          <div onClick={() => history.goBack()} className="close-btn" to="/">
            Close
          </div>
        </InnerCard>
      </PlayerCardContainer>
    )
  );
};

export default PlayerCard;

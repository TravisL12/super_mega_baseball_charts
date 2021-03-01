import React from 'react';
import { SkillRating, StyledPlayerSkill } from './styles';

export const PlayerSkill = ({ skill, rating }) => {
  return (
    <StyledPlayerSkill>
      <span>{skill}</span>
      <span>
        <SkillRating width={rating} />
      </span>
    </StyledPlayerSkill>
  );
};

export default PlayerSkill;

import React from 'react';
import { SKILLS, positionsAbbrev } from '../utilities/constants';

const RATING_PERCENT = [SKILLS.age, SKILLS.trait_pretty, SKILLS.trait_2_pretty];

const DISPLAY_VALUES = {
  pitcher: [SKILLS.pitcher_role],
  position: [SKILLS.position, SKILLS.position_2],
};

export const getTeamLogo = (player, header) => {
  return header === SKILLS.team ? (
    <img
      alt={`${player[header]} logo`}
      src={`${process.env.PUBLIC_URL}/team_logos/${player[header]}.png`}
    />
  ) : null;
};

export const getRatingPercent = (player, header) => {
  return !isNaN(player[header]) && !RATING_PERCENT.includes(header)
    ? `${player[header]}%`
    : null;
};

export const getDisplayValue = (player, header) => {
  const traits = player.isPitcher
    ? DISPLAY_VALUES.pitcher
    : DISPLAY_VALUES.position;
  return traits.includes(header)
    ? positionsAbbrev[player[header]]
    : player[header];
};

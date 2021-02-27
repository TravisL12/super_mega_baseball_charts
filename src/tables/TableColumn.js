import React, { useMemo } from 'react';
import { Img, PitchTypeContainer } from '../styles';
import { positionsAbbrev, SKILLS } from '../utilities/constants';
import { PlayerColumn } from '../styles/Table.style';
import { Link } from 'react-router-dom';

const centeredColumns = [
  SKILLS.age,
  SKILLS.arsenal,
  SKILLS.pitcherRole,
  SKILLS.position,
  SKILLS.trait,
  SKILLS.trait2,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.position2,
  SKILLS.gender,
];

const RATING_PERCENT = [SKILLS.age, SKILLS.trait_pretty, SKILLS.trait_2_pretty];

const DISPLAY_VALUES = {
  pitcher: [SKILLS.pitcher_role],
  position: [SKILLS.position, SKILLS.position_2],
};

const TableColumn = ({ player, header, isSelected }) => {
  const logo = useMemo(() => {
    return header === SKILLS.team ? (
      <Img
        alt={`${player[header]} logo`}
        src={`${process.env.PUBLIC_URL}/team_logos/${player[header]}.png`}
      />
    ) : null;
  }, [player, header]);

  const ratingPercent = useMemo(() => {
    return !isNaN(player[header]) && !RATING_PERCENT.includes(header)
      ? `${player[header]}%`
      : null;
  }, [player, header]);

  let displayValue = useMemo(() => {
    const traits = player.isPitcher
      ? DISPLAY_VALUES.pitcher
      : DISPLAY_VALUES.position;
    return traits.includes(header)
      ? positionsAbbrev[player[header]]
      : player[header];
  }, [player, header]);

  if (header === SKILLS.arsenal) {
    displayValue = player[header].map((pitch) => {
      return (
        <PitchTypeContainer key={pitch} pitchType={pitch}>
          {pitch}
        </PitchTypeContainer>
      );
    });
  }

  if (header === SKILLS.name) {
    displayValue = (
      <Link className="modal-link" to={`/player/${player.name}`}>
        {player[header]}
      </Link>
    );
  }

  return (
    <PlayerColumn
      key={header}
      isSelected={isSelected}
      centered={centeredColumns.includes(header)}
      className={`player-${header}`}
    >
      {ratingPercent && (
        <span className="rating-color" style={{ width: ratingPercent }}></span>
      )}
      {logo}
      <span className="rating-value">{displayValue}</span>
    </PlayerColumn>
  );
};

export default React.memo(TableColumn);

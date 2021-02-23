import React from 'react';
import { PitchTypeContainer } from '../styles';
import { SKILLS } from '../utilities/constants';
import {
  getDisplayValue,
  getRatingPercent,
  getTeamLogo,
} from './tableUtilities';
import { PlayerColumn } from '../styles/Table.style';

const TableColumn = ({ player, header, isSelected }) => {
  const logo = getTeamLogo(player, header);
  const ratingPercent = getRatingPercent(player, header);
  let displayValue = getDisplayValue(player, header);

  if (header === SKILLS.arsenal) {
    displayValue = player[header].map((pitch) => {
      return (
        <PitchTypeContainer key={pitch} pitchType={pitch}>
          {pitch}
        </PitchTypeContainer>
      );
    });
  }

  return (
    <PlayerColumn
      key={header}
      isSelected={isSelected}
      className={`player-${header}`}
    >
      {ratingPercent && (
        <span className="rating-color" style={{ width: ratingPercent }}></span>
      )}
      {logo}
      {!logo && <span className="rating-value">{displayValue}</span>}
    </PlayerColumn>
  );
};

export default React.memo(TableColumn);

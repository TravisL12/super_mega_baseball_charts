import React from 'react';
import { PitchTypeContainer } from '../styles';
import { SKILLS } from '../utilities/buildPlayer';
import {
  getDisplayValue,
  getRatingPercent,
  getTeamLogo,
} from './tableUtilities';

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
    <td
      className={`player-col player-${header} ${
        isSelected ? 'selectedPlayer' : ''
      }`}
      key={header}
    >
      {ratingPercent && (
        <span className="rating-color" style={{ width: ratingPercent }}></span>
      )}
      {logo}
      <span className="rating-value">{displayValue}</span>
    </td>
  );
};

export default React.memo(TableColumn);

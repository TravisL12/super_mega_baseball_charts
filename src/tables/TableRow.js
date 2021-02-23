import React from 'react';
import { ToggleItemLink } from '../styles/FilterList.style';
import { PlayerColumn, SelectionCheckbox } from '../styles/Table.style';
import TableColumn from './TableColumn';

const TableRow = ({
  isSelected,
  isChecked,
  player,
  handlePlayerCompareChange,
  setModalPlayer,
  headers,
}) => {
  const selectedRow = isSelected || isChecked;
  return (
    <tr key={player.name}>
      <PlayerColumn isSelected={selectedRow} className="player-checkbox">
        <SelectionCheckbox>
          <input
            id={`compare-${player.name}`}
            value={player.id}
            checked={selectedRow}
            type="checkbox"
            onChange={handlePlayerCompareChange}
          />
          <label htmlFor={`compare-${player.name}`}>
            <div className="checkbox-label"></div>
          </label>
        </SelectionCheckbox>
      </PlayerColumn>
      {headers.map((header) => {
        return (
          <TableColumn
            key={header}
            isSelected={selectedRow}
            player={player}
            header={header}
          />
        );
      })}
      <PlayerColumn isSelected={selectedRow}>
        <span className="rating-value">
          <ToggleItemLink onClick={() => setModalPlayer(player)}>
            Show Card
          </ToggleItemLink>
        </span>
      </PlayerColumn>
    </tr>
  );
};

export default React.memo(TableRow);

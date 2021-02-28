import React from 'react';
import { PlayerColumn, SelectionCheckbox } from '../styles/Table.style';
import TableColumn from './TableColumn';

const TableRow = ({ isChecked, player, addPlayerCompareList, headers }) => {
  return (
    <tr key={player.name}>
      <PlayerColumn isSelected={isChecked} className="player-checkbox">
        <SelectionCheckbox>
          <input
            id={`compare-${player.name}`}
            value={player.id}
            checked={isChecked}
            type="checkbox"
            onChange={() => {
              addPlayerCompareList(player.id);
            }}
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
            isSelected={isChecked}
            player={player}
            header={header}
          />
        );
      })}
    </tr>
  );
};

export default React.memo(TableRow);

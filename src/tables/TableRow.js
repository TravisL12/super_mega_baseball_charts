import React from 'react';
import { ToggleItemLink } from '../styles/FilterList.style';
import { TableRowContainer, SelectionCheckbox } from '../styles/Table.style';
import TableColumn from './TableColumn';

const TableRow = ({
  isSelected,
  isChecked,
  player,
  handlePlayerCompareChange,
  setModalPlayer,
  headers,
}) => {
  return (
    <TableRowContainer key={player.name} isChecked={isChecked}>
      <td
        className={`player-col player-checkbox ${
          isSelected ? 'selectedPlayer' : ''
        }`}
      >
        <SelectionCheckbox>
          <input
            id={`compare-${player.name}`}
            value={player.id}
            checked={isChecked}
            type="checkbox"
            onChange={handlePlayerCompareChange}
          />
          <label htmlFor={`compare-${player.name}`}>
            <div className="checkbox-label"></div>
          </label>
        </SelectionCheckbox>
      </td>
      {headers.map((header) => {
        return (
          <TableColumn
            key={header}
            isSelected={isSelected}
            player={player}
            header={header}
          />
        );
      })}
      <td className={`player-col  ${isSelected ? 'selectedPlayer' : ''}`}>
        <span className="rating-value">
          <ToggleItemLink onClick={() => setModalPlayer(player)}>
            Show Card
          </ToggleItemLink>
        </span>
      </td>
    </TableRowContainer>
  );
};

export default React.memo(TableRow);

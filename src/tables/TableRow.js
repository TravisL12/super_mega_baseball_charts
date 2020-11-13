import React from 'react';
import TableColumn from './TableColumn';

const TableRow = ({
  isSelected,
  player,
  handlePlayerCompareChange,
  setModalPlayer,
  headers,
}) => {
  return (
    <tr key={player.name}>
      <td
        className={`player-col player-checkbox ${
          isSelected ? 'selectedPlayer' : ''
        }`}
      >
        <span className="rating-value">
          <input
            id={`compare-${player.name}`}
            value={player.id}
            checked={player.checked}
            type="checkbox"
            onChange={handlePlayerCompareChange}
          />
          <label htmlFor={`compare-${player.name}`}>Compare</label>
        </span>
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
          <button onClick={() => setModalPlayer(player)}>Show Card</button>
        </span>
      </td>
    </tr>
  );
};

export default React.memo(TableRow);

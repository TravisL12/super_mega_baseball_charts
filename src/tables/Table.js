import React from 'react';
import usePlayerSort from '../hooks/usePlayerSort';
import TableColumn from './TableColumn';

const Table = ({
  players,
  headers,
  columnNameMap,
  setModalPlayer,
  modalPlayer,
}) => {
  const { sortOrder, updateSort, sortColumns } = usePlayerSort();

  if (!players.length)
    return (
      <div className="no-players">
        <p>No players found.</p>
        <p>Adjust the search filters.</p>
      </div>
    );

  return (
    <table>
      <thead>
        <tr>
          <th className={`header-col`}>{/* Checkbox */}</th>
          {headers.map((header) => (
            <th
              className={`header-col header-${header}`}
              onClick={() => updateSort(header)}
              key={header}
            >
              {columnNameMap[header]}
            </th>
          ))}
          <th className={`header-col`}>{/* Player Card */}</th>
        </tr>
      </thead>
      <tbody>
        {sortColumns(players, sortOrder).map((player) => {
          const isSelected = player.name === modalPlayer?.name;
          return (
            <tr key={player.name}>
              <td
                className={`player-col  ${isSelected ? 'selectedPlayer' : ''}`}
              >
                <span className="rating-value">
                  <input type="checkbox" />
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
              <td
                className={`player-col  ${isSelected ? 'selectedPlayer' : ''}`}
              >
                <span className="rating-value">
                  <button onClick={() => setModalPlayer(player)}>
                    Show Card
                  </button>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

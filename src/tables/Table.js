import React from 'react';
import usePlayerSort from '../hooks/usePlayerSort';
import TableColumn from './TableColumn';

const Table = ({ players, headers, columnNameMap, setModalPlayer }) => {
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
          {headers.map((header) => (
            <th
              className={`header-col header-${header}`}
              onClick={() => updateSort(header)}
              key={header}
            >
              {columnNameMap[header]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortColumns(players, sortOrder).map((player) => (
          <tr key={player.name} onClick={() => setModalPlayer(player)}>
            {headers.map((header) => {
              return (
                <TableColumn key={header} player={player} header={header} />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

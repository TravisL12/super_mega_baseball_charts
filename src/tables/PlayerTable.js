import React from 'react';
import usePlayerSort from '../hooks/usePlayerSort';
import TableRow from './TableRow';

const PlayerTable = ({
  players,
  headers,
  columnNameMap,
  setModalPlayer,
  modalPlayer,
  addPlayerCompareList,
  hasSelectedPlayers,
  toggleCompare,
  showCompare,
}) => {
  const { sortOrder, updateSort, sortColumns } = usePlayerSort();

  const handlePlayerCompareChange = (event) => {
    addPlayerCompareList(event.target.value);
  };

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
          <th className={`header-col`}>
            <button disabled={hasSelectedPlayers} onClick={toggleCompare}>
              {showCompare ? 'Compare On' : 'Compare Off'}
            </button>
          </th>
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
            <TableRow
              key={player.name}
              isSelected={isSelected}
              player={player}
              handlePlayerCompareChange={handlePlayerCompareChange}
              setModalPlayer={setModalPlayer}
              headers={headers}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default PlayerTable;

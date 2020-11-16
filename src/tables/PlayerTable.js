import React from 'react';
import TableRow from './TableRow';

const PlayerTable = ({
  players,
  headers,
  columnNameMap,
  setModalPlayer,
  modalPlayer,
  addPlayerCompareList,
  toggleCompare,
  filters,
  updateSort,
}) => {
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
            <button
              disabled={filters.comparePlayerIds.length === 0}
              onClick={toggleCompare}
            >
              {filters.showCompare ? 'Compare Off' : 'Compare On'}
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
        {players.map((player) => {
          const isSelected = player.name === modalPlayer?.name;
          const isChecked = filters.comparePlayerIds.includes(player.id);
          return (
            <TableRow
              key={player.name}
              isSelected={isSelected}
              isChecked={isChecked}
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

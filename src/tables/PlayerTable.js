import React from 'react';
import TableRow from './TableRow';
import { PlayerColumnHeader } from '../styles/Table.style';
import { SKILLS } from '../utilities/constants';

const centeredColumns = [SKILLS.age, SKILLS.position, SKILLS.arsenal];

const PlayerTable = ({
  players,
  headers,
  columnNameMap,
  setModalPlayer,
  modalPlayer,
  addPlayerCompareList,
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
          <PlayerColumnHeader>{/* Compare Checkbox */}</PlayerColumnHeader>
          {headers.map((header) => (
            <PlayerColumnHeader
              centered={centeredColumns.includes(header)}
              className={`header-${header}`}
              onClick={() => updateSort(header)}
              key={header}
            >
              {columnNameMap[header]}
            </PlayerColumnHeader>
          ))}
          <PlayerColumnHeader>{/* Player Card */}</PlayerColumnHeader>
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

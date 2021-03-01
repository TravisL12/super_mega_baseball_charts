import React from 'react';
import TableRow from './TableRow';
import { PlayerColumnHeader } from '../styles/Table.style';
import { SKILLS } from '../utilities/constants';
import { NoPlayer } from '../styles';
import SelectionCheckbox from './SelectionCheckbox';

const centeredColumns = [SKILLS.age, SKILLS.position, SKILLS.arsenal];

const PlayerTable = ({
  players,
  headers,
  addPlayerCompareList,
  clearCompareSelection,
  filters,
  updateSort,
}) => {
  if (!players.length) {
    return (
      <NoPlayer>
        <p>No players found.</p>
        <p>Adjust the search filters.</p>
      </NoPlayer>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <PlayerColumnHeader>
            {filters.comparePlayerIds.length > 0 && (
              <SelectionCheckbox
                onChange={clearCompareSelection}
                isChecked={filters.comparePlayerIds.length > 0}
                id="clear-compare"
                value="on"
              />
            )}
          </PlayerColumnHeader>
          {headers.map(({ header, column }) => (
            <PlayerColumnHeader
              centered={centeredColumns.includes(header)}
              className={`header-${header}`}
              onClick={() => updateSort(header)}
              key={header}
            >
              {column}
            </PlayerColumnHeader>
          ))}
          <PlayerColumnHeader>{/* Player Card */}</PlayerColumnHeader>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => {
          const isChecked = filters.comparePlayerIds.includes(player.id);
          return (
            <TableRow
              key={player.name}
              isChecked={isChecked}
              player={player}
              addPlayerCompareList={addPlayerCompareList}
              headers={headers}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default PlayerTable;

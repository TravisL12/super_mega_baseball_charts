import React, { useState } from 'react';
import teamLogos from '../team_logos';
import { positionsAbbrev } from '../helper';
import {
  TEAM,
  NAME,
  POSITION,
  POSITION_2,
  POWER,
  CONTACT,
  SPEED,
  FIELDING,
  ARM,
  TRAIT,
  TRAIT_2,
  BATS,
  THROWS,
  AGE,
  GENDER,
  ARSENAL,
} from '../buildPlayer';
import usePlayerSort from '../usePlayerSort';

const columnNameMap = {
  [TEAM]: 'team',
  [NAME]: 'name',
  [POSITION]: 'P. Pos',
  [POSITION_2]: 'S. Pos',
  [POWER]: 'pow',
  [CONTACT]: 'con',
  [SPEED]: 'spd',
  [FIELDING]: 'fld',
  [ARM]: 'arm',
  [TRAIT]: 'trait 1',
  [TRAIT_2]: 'trait 2',
  [BATS]: 'bat',
  [THROWS]: 'thr',
  [AGE]: 'age',
  [GENDER]: 'gen',
};

const headers = [
  TEAM,
  NAME,
  POSITION,
  POSITION_2,
  POWER,
  CONTACT,
  SPEED,
  FIELDING,
  ARM,
  TRAIT,
  TRAIT_2,
  BATS,
  THROWS,
  AGE,
  GENDER,
];

const PlayerTable = ({ players }) => {
  const { sortOrder, updateSort, sortColumns } = usePlayerSort();

  if (!players.length)
    return (
      <div className="no-players">
        <p>No Pitchers found.</p>
        <p>Check the Pitchers button at the top,</p>
        <p>or adjust the search filters.</p>
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
        {sortColumns(players, sortOrder).map(({ display }) => (
          <tr key={display.name}>
            {headers.map((header) => {
              const ratingPercent =
                !isNaN(display[header]) &&
                !['age', 'trait', 'trait2'].includes(header)
                  ? `${display[header]}%`
                  : null;

              let displayValue = [POSITION, POSITION_2].includes(header)
                ? positionsAbbrev[display[header]]
                : display[header];

              if (header === ARSENAL) {
                displayValue = display[header].map((pitch) => {
                  return (
                    <span key={pitch} className={`pitch-type pitch-${pitch}`}>
                      {pitch}
                    </span>
                  );
                });
              }

              const logo =
                header === TEAM ? (
                  <img
                    alt={`${display[header]} logo`}
                    src={
                      teamLogos[display[header].replace(/\s/, '').toLowerCase()]
                    }
                  />
                ) : null;

              return (
                <td className={`player-col player-${header}`} key={header}>
                  {ratingPercent && (
                    <span
                      className="rating-color"
                      style={{ width: ratingPercent }}
                    ></span>
                  )}
                  {logo}
                  <span className="rating-value">{displayValue}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayerTable;

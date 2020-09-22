import React, { useState } from 'react';
import teamLogos from '../team_logos';
import { positionsAbbrev } from '../helper';
import usePlayerSort from '../usePlayerSort';
import {
  TEAM,
  NAME,
  PITCHER_ROLE,
  POWER,
  CONTACT,
  SPEED,
  FIELDING,
  TRAIT,
  TRAIT_2,
  BATS,
  THROWS,
  AGE,
  GENDER,
  ARSENAL,
  VELOCITY,
  JUNK,
  ACCURACY,
} from '../buildPlayer';

const columnNameMap = {
  [TEAM]: 'team',
  [NAME]: 'name',
  [PITCHER_ROLE]: 'role',
  [POWER]: 'pow',
  [CONTACT]: 'con',
  [SPEED]: 'spd',
  [FIELDING]: 'fld',
  [ARSENAL]: 'arsenal',
  [VELOCITY]: 'vel',
  [JUNK]: 'jnk',
  [ACCURACY]: 'acc',
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
  PITCHER_ROLE,
  ARSENAL,
  POWER,
  CONTACT,
  SPEED,
  FIELDING,
  VELOCITY,
  JUNK,
  ACCURACY,
  TRAIT,
  TRAIT_2,
  BATS,
  THROWS,
  AGE,
  GENDER,
];

const PitcherTable = ({ players }) => {
  const { sortOrder, updateSort, sortColumns } = usePlayerSort();

  if (!players.length)
    return (
      <div className="no-players">
        <p>No Pitchers found.</p>
        <p>Check the Positions button at the top,</p>
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

              let displayValue = [PITCHER_ROLE].includes(header)
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

export default PitcherTable;

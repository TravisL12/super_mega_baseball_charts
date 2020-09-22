import React, { useState } from 'react';
import teamLogos from '../team_logos';
import { positionsAbbrev } from '../helper';
import usePlayerSort from '../usePlayerSort';
import { SKILLS } from '../buildPlayer';

const columnNameMap = {
  [SKILLS.TEAM]: 'team',
  [SKILLS.NAME]: 'name',
  [SKILLS.PITCHER_ROLE]: 'role',
  [SKILLS.POWER]: 'pow',
  [SKILLS.CONTACT]: 'con',
  [SKILLS.SPEED]: 'spd',
  [SKILLS.FIELDING]: 'fld',
  [SKILLS.ARSENAL]: 'arsenal',
  [SKILLS.VELOCITY]: 'vel',
  [SKILLS.JUNK]: 'jnk',
  [SKILLS.ACCURACY]: 'acc',
  [SKILLS.TRAIT]: 'trait 1',
  [SKILLS.TRAIT_2]: 'trait 2',
  [SKILLS.BATS]: 'bat',
  [SKILLS.THROWS]: 'thr',
  [SKILLS.AGE]: 'age',
  [SKILLS.GENDER]: 'gen',
};

const headers = [
  SKILLS.TEAM,
  SKILLS.NAME,
  SKILLS.PITCHER_ROLE,
  SKILLS.ARSENAL,
  SKILLS.POWER,
  SKILLS.CONTACT,
  SKILLS.SPEED,
  SKILLS.FIELDING,
  SKILLS.VELOCITY,
  SKILLS.JUNK,
  SKILLS.ACCURACY,
  SKILLS.TRAIT,
  SKILLS.TRAIT_2,
  SKILLS.BATS,
  SKILLS.THROWS,
  SKILLS.AGE,
  SKILLS.GENDER,
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

              let displayValue = [SKILLS.PITCHER_ROLE].includes(header)
                ? positionsAbbrev[display[header]]
                : display[header];

              if (header === SKILLS.ARSENAL) {
                displayValue = display[header].map((pitch) => {
                  return (
                    <span key={pitch} className={`pitch-type pitch-${pitch}`}>
                      {pitch}
                    </span>
                  );
                });
              }

              const logo =
                header === SKILLS.TEAM ? (
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

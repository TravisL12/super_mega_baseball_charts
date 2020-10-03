import React from 'react';
import teamLogos from '../team_logos';
import { positionsAbbrev } from '../helper';
import { SKILLS } from '../buildPlayer';
import usePlayerSort from '../usePlayerSort';

const columnNameMap = {
  [SKILLS.team]: 'team',
  [SKILLS.name]: 'name',
  [SKILLS.position]: 'P. Pos',
  [SKILLS.position_2]: 'S. Pos',
  [SKILLS.power]: 'pow',
  [SKILLS.contact]: 'con',
  [SKILLS.speed]: 'spd',
  [SKILLS.fielding]: 'fld',
  [SKILLS.arm]: 'arm',
  [SKILLS.trait]: 'trait 1',
  [SKILLS.trait_2]: 'trait 2',
  [SKILLS.bats]: 'bat',
  [SKILLS.throws]: 'thr',
  [SKILLS.age]: 'age',
  [SKILLS.gender]: 'gen',
};

const headers = [
  SKILLS.team,
  SKILLS.name,
  SKILLS.position,
  SKILLS.position_2,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.trait,
  SKILLS.trait_2,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.gender,
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
        {sortColumns(players, sortOrder).map((player) => (
          <tr key={player.name}>
            {headers.map((header) => {
              const ratingPercent =
                !isNaN(player[header]) &&
                ![SKILLS.age, SKILLS.trait, SKILLS.trait_2].includes(header)
                  ? `${player[header]}%`
                  : null;

              let displayValue = [SKILLS.position, SKILLS.position_2].includes(
                header
              )
                ? positionsAbbrev[player[header]]
                : player[header];

              const logo =
                header === SKILLS.team ? (
                  <img
                    alt={`${player[header]} logo`}
                    src={
                      teamLogos[player[header].replace(/\s/, '').toLowerCase()]
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

import React from 'react';
import { positionsAbbrev } from '../helper';
import usePlayerSort from '../usePlayerSort';
import { SKILLS } from '../buildPlayer';
import { PitchTypeContainer } from '../styles';

const columnNameMap = {
  [SKILLS.team]: 'team',
  [SKILLS.name]: 'name',
  [SKILLS.pitcher_role]: 'role',
  [SKILLS.power]: 'pow',
  [SKILLS.contact]: 'con',
  [SKILLS.speed]: 'spd',
  [SKILLS.fielding]: 'fld',
  [SKILLS.arsenal]: 'arsenal',
  [SKILLS.velocity]: 'vel',
  [SKILLS.junk]: 'jnk',
  [SKILLS.accuracy]: 'acc',
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
  SKILLS.pitcher_role,
  SKILLS.arsenal,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
  SKILLS.trait,
  SKILLS.trait_2,
  SKILLS.bats,
  SKILLS.throws,
  SKILLS.age,
  SKILLS.gender,
];

const PitcherTable = ({ players, setModalPlayer }) => {
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
        {sortColumns(players, sortOrder).map((player) => (
          <tr key={player.name} onClick={() => setModalPlayer(player)}>
            {headers.map((header) => {
              const ratingPercent =
                !isNaN(player[header]) &&
                ![SKILLS.age, SKILLS.trait, SKILLS.trait_2].includes(header)
                  ? `${player[header]}%`
                  : null;

              let displayValue = [SKILLS.pitcher_role].includes(header)
                ? positionsAbbrev[player[header]]
                : player[header];

              if (header === SKILLS.arsenal) {
                displayValue = player[header].map((pitch) => {
                  return (
                    <PitchTypeContainer key={pitch} pitchType={pitch}>
                      {pitch}
                    </PitchTypeContainer>
                  );
                });
              }

              const logo =
                header === SKILLS.team ? (
                  <img
                    alt={`${player[header]} logo`}
                    src={`${process.env.PUBLIC_URL}/team_logos/${player[header]}.png`}
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

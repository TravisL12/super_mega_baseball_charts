import React from 'react';
import { mean, values } from 'lodash';
import { SKILLS } from '../buildPlayer';
import usePlayerSort from '../usePlayerSort';

// power, contact, speed, defense, rotation, bullpen
// pow, con, spd, def, rot, pen

// wildpigs
// 3 1 5 1 4 4

// bees
// 2 3 4 4 4 2

// blowfish
// 3 6 4 3 4 2

// buzzards
// 2 4 4 5 2 3

const defense = [SKILLS.fielding, SKILLS.arm];

const pitching = [SKILLS.velocity, SKILLS.junk, SKILLS.accuracy];

const headers = [
  SKILLS.team,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  'defense',
  'rotation',
  'bullpen',
];

const buildRatings = (players, skills) => {
  return skills.reduce((acc, skill) => {
    acc[skill] =
      players.reduce((total, player) => {
        return total + +player[skill];
      }, 0) / players.length;

    return acc;
  }, {});
};

const TeamTable = ({ teams }) => {
  const { sortOrder, updateSort, sortColumns } = usePlayerSort();
  const teamRatings = Object.keys(teams).map((name) => {
    const powerRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => !isPitcher),
      [SKILLS.power]
    );

    const contactRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => !isPitcher),
      [SKILLS.contact]
    );

    const speedRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => !isPitcher),
      [SKILLS.speed]
    );

    const defenseRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => !isPitcher),
      defense
    );

    const rotationRatings = buildRatings(
      teams[name].players.filter(
        (player) =>
          player.isPitcher && player[SKILLS.pitcher_role] === 'Starting'
      ),
      pitching
    );

    const bullpenRatings = buildRatings(
      teams[name].players.filter(
        (player) =>
          player.isPitcher && player[SKILLS.pitcher_role] !== 'Starting'
      ),
      pitching
    );

    return {
      logo: `${process.env.PUBLIC_URL}/team_logos/${name}.png`,
      team: name,
      power: values(powerRatings)[0],
      contact: values(contactRatings)[0],
      speed: values(speedRatings)[0],
      defense: mean(values(defenseRatings)),
      rotation: mean(values(rotationRatings)),
      bullpen: mean(values(bullpenRatings)),
    };
  });

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
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortColumns(teamRatings, sortOrder).map((team, idx) => {
          return (
            <tr key={`team.name-${idx}`}>
              {headers.map((header) => {
                if (header === SKILLS.team) {
                  return (
                    <td
                      className={`player-col team-col team-${header}`}
                      key={header}
                    >
                      <div className="team-logo">
                        <img alt={team[header]} src={team.logo} />
                        <p>{team[header]}</p>
                      </div>
                    </td>
                  );
                }
                return (
                  <td
                    className={`player-col team-col team-${header}`}
                    key={header}
                  >
                    <span className="rating-value">
                      {team[header].toFixed(0)}
                    </span>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TeamTable;

import React from "react";
import teamLogos from "../team_logos";
import { SKILLS } from "../buildPlayer";
import usePlayerSort from "../usePlayerSort";

// power, contact, speed, defense, rotation, bullpen
// pow, con, spd, def, rot, pen

const batting = [
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
];

const pitching = [SKILLS.velocity, SKILLS.junk, SKILLS.accuracy];

const headers = [
  SKILLS.team,
  SKILLS.power,
  SKILLS.contact,
  SKILLS.speed,
  SKILLS.fielding,
  SKILLS.arm,
  SKILLS.velocity,
  SKILLS.junk,
  SKILLS.accuracy,
];

const buildRatings = (players, showPitchers = false) => {
  const skills = showPitchers ? pitching : batting;

  return skills.reduce((acc, skill) => {
    const rating =
      players.reduce((total, { display }) => {
        return total + +display[skill];
      }, 0) / players.length;

    acc[skill] = rating;
    return acc;
  }, {});
};

const TeamTable = ({ teams }) => {
  const { sortOrder, updateSort, sortTeamColumns } = usePlayerSort();
  const teamRatings = Object.keys(teams).map((name) => {
    const positionRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => !isPitcher)
    );

    const pitchingRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => isPitcher),
      true
    );
    const logo = teamLogos[name.replace(/\s/, "").toLowerCase()];

    return {
      logo,
      team: name,
      ...positionRatings,
      ...pitchingRatings,
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
        {sortTeamColumns(teamRatings, sortOrder).map((team) => {
          return (
            <tr key={team.name}>
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
                    {team[header].toFixed(0)}
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

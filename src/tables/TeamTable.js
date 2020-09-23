import React from 'react';
import teamLogos from '../team_logos';
import { TeamTableContainer } from '../styles';
import { SKILLS } from '../buildPlayer';

// power, contact, speed, defense, rotation, bullpen
// pow, con, spd, def, rot, pen

const batting = [
  SKILLS.POWER,
  SKILLS.CONTACT,
  SKILLS.SPEED,
  SKILLS.FIELDING,
  SKILLS.ARM,
];

const pitching = [SKILLS.VELOCITY, SKILLS.JUNK, SKILLS.ACCURACY];

const headers = [
  SKILLS.TEAM,
  SKILLS.POWER,
  SKILLS.CONTACT,
  SKILLS.SPEED,
  SKILLS.FIELDING,
  SKILLS.ARM,
  SKILLS.VELOCITY,
  SKILLS.JUNK,
  SKILLS.ACCURACY,
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
  const ratings = Object.keys(teams).map((name) => {
    const positionRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => !isPitcher)
    );

    const pitchingRatings = buildRatings(
      teams[name].players.filter(({ isPitcher }) => isPitcher),
      true
    );
    const logo = teamLogos[name.replace(/\s/, '').toLowerCase()];

    return {
      team: name,
      ratings: { ...positionRatings, ...pitchingRatings },
      logo,
    };
  });
  console.log(ratings);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              className={`header-col header-${header}`}
              // onClick={() => updateSort(header)}
              key={header}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {headers.map((header) => {
          return (
            <tr>
              {ratings.map(({ ratings }) => {
                return <td>{ratings[header].toFixed(0)}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>

    // <TeamTableContainer>
    //   {Object.values(teams).map(({ name }) => {
    //     const positionRatings = buildRatings(
    //       teams[name].players.filter(({ isPitcher }) => !isPitcher)
    //     );

    //     const pitchingRatings = buildRatings(
    //       teams[name].players.filter(({ isPitcher }) => isPitcher),
    //       true
    //     );

    //     return (
    //       <div className="team" key={name}>
    //         <div className="title" key={name}>
    //           <img
    //             alt={`${name} logo`}
    //             src={teamLogos[name.replace(/\s/, '').toLowerCase()]}
    //           />
    //         </div>
    //         <div className="skill-tables">
    //           <div>
    //             {positionRatings.map(({ skill, rating }) => {
    //               return (
    //                 <div className="skill" key={skill}>
    //                   <span>{skill}</span>
    //                   <span>{rating.toFixed(0)}</span>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //           <div>
    //             {pitchingRatings.map(({ skill, rating }) => {
    //               return (
    //                 <div className="skill" key={skill}>
    //                   <span>{skill}</span>
    //                   <span>{rating.toFixed(0)}</span>
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </TeamTableContainer>
  );
};

export default TeamTable;

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

const buildRatings = (players, showPitchers = false) => {
  const skills = showPitchers ? pitching : batting;

  return skills.map((skill) => {
    const rating =
      players.reduce((total, { display }) => {
        return total + +display[skill];
      }, 0) / players.length;

    return { skill, rating };
  });
};

const TeamTable = ({ teams }) => {
  return (
    <TeamTableContainer>
      {Object.values(teams).map(({ name }) => {
        const positionRatings = buildRatings(
          teams[name].players.filter(({ isPitcher }) => !isPitcher)
        );

        const pitchingRatings = buildRatings(
          teams[name].players.filter(({ isPitcher }) => isPitcher),
          true
        );

        return (
          <div className="team" key={name}>
            <div className="title" key={name}>
              <div>
                <img
                  alt={`${name} logo`}
                  src={teamLogos[name.replace(/\s/, '').toLowerCase()]}
                />
              </div>
              <h1>{name}</h1>
            </div>
          </div>
        );
      })}
    </TeamTableContainer>
  );
};

export default TeamTable;

import React, { useState } from 'react';
import { keys, mean, values } from 'lodash';
import { SKILLS } from '../utilities/constants';

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

const TeamTable = ({ teams }) => {
  const [selectTeam, setSelectedTeam] = useState(null);

  return (
    <div style={{ display: 'flex', padding: '30px' }}>
      <div style={{ padding: '0 30px' }}>
        <ul>
          {keys(teams).map((team) => (
            <li onClick={() => setSelectedTeam(teams[team])}>
              {teams[team].name}
            </li>
          ))}
        </ul>
      </div>
      {selectTeam && (
        <div>
          {selectTeam.players.map((player) => (
            <div>
              {player.name} - {player.position ?? 'Pitcher'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamTable;

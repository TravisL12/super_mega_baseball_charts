import React, { useState } from 'react';
import { keys, mean, values } from 'lodash';
import { positionsAbbrev, SKILLS } from '../utilities/constants';

import { PlayerSkill } from '../PlayerCard';
import {
  StyledTeamBody,
  StyledTeamList,
  StyledTeamTable,
  PitchTypeContainer,
  TeamTablePlayerContainer,
} from '../styles';

const TeamTable = ({ teams }) => {
  const [selectTeam, setSelectedTeam] = useState(null);

  return (
    <StyledTeamTable>
      <StyledTeamList>
        <ul>
          {keys(teams).map((team) => (
            <li onClick={() => setSelectedTeam(teams[team])}>
              {teams[team].name}
            </li>
          ))}
        </ul>
      </StyledTeamList>
      {selectTeam && (
        <StyledTeamBody>
          {selectTeam.players.map((player) => (
            <TeamTablePlayerContainer>
              <div className="player-image">
                <img
                  alt={`${player.name} in all ${
                    player.gender === 'M' ? 'his' : 'her'
                  } glory`}
                  src={`${process.env.PUBLIC_URL}/player_pics/${player.image}`}
                />
              </div>
              <div className="player-skills">
                <div className="bat-throw-pos">
                  <span>Bat: {player.bats}</span>
                  <span>Thr: {player.throws}</span>
                  {player.isPitcher ? (
                    <>
                      <span>Pitcher Type: {player.pitcherRole}</span>
                      <span>Arm Slot: {player.arm_slot}</span>
                    </>
                  ) : (
                    <>
                      <span>Position: {positionsAbbrev[player.position]}</span>
                      <span>
                        Secondary Position: {positionsAbbrev[player.position2]}
                      </span>
                    </>
                  )}
                </div>
                <div className="skills">
                  <PlayerSkill skill={'power'} rating={player.power} />
                  <PlayerSkill skill={'contact'} rating={player.contact} />
                  <PlayerSkill skill={'speed'} rating={player.speed} />
                  <PlayerSkill skill={'fielding'} rating={player.fielding} />
                  {!player.isPitcher && (
                    <PlayerSkill skill={'arm'} rating={player.arm} />
                  )}
                  {player.isPitcher && (
                    <>
                      <PlayerSkill
                        skill={'velocity'}
                        rating={player.velocity}
                      />
                      <PlayerSkill skill={'junk'} rating={player.junk} />
                      <PlayerSkill
                        skill={'accuracy'}
                        rating={player.accuracy}
                      />
                      <div>
                        {player.arsenal.map((pitch) => (
                          <PitchTypeContainer key={pitch} pitchType={pitch}>
                            {pitch}
                          </PitchTypeContainer>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TeamTablePlayerContainer>
          ))}
        </StyledTeamBody>
      )}
    </StyledTeamTable>
  );
};

export default TeamTable;

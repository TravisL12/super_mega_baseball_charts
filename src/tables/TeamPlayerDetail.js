import React from 'react';
import { PlayerSkill } from '../PlayerCard';
import PlayerImage from '../PlayerImage';
import { Box, PitchTypeContainer, TeamTablePlayerContainer } from '../styles';

const TeamPlayerDetail = ({ player, height }) => {
  return (
    <TeamTablePlayerContainer key={player.name} height={height}>
      <div className="player-image">
        <PlayerImage
          alt={`${player.name} in all ${
            player.gender === 'M' ? 'his' : 'her'
          } glory`}
          src={`${process.env.PUBLIC_URL}/player_pics/${player.image}`}
        />
      </div>
      <div className="player-skills">
        <div className="info">
          <Box>
            <span>{player.name}</span>
          </Box>
          <Box>
            <span className="title">Age:</span>
            <span>{player.age}</span>
          </Box>
          <Box>
            <span className="title">Rating:</span>
            <span>{player.rating}</span>
          </Box>
          <Box>
            <span className="title">Gender:</span>
            <span>{player.gender}</span>
          </Box>
          <Box>
            <span className="title">Bats:</span>
            <span>{player.bats}</span>
          </Box>
          <Box>
            <span className="title">Throws:</span>
            <span>{player.throws}</span>
          </Box>
          {player.isPitcher ? (
            <>
              <Box>
                <span>Pitcher Type:</span>
                <span>{player.pitcherRole}</span>
              </Box>
              <Box>
                <span className="title">Arm Slot:</span>
                <span>{player.arm_slot}</span>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <span className="title">Position:</span>
                <span>{player.position}</span>
              </Box>
              <Box>
                <span className="title">Position 2:</span>
                <span>{player.position2}</span>
              </Box>
            </>
          )}
          <Box>
            <span className="title">Salary:</span>
            <span>{player.salary}</span>
          </Box>
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
              <PlayerSkill skill={'velocity'} rating={player.velocity} />
              <PlayerSkill skill={'junk'} rating={player.junk} />
              <PlayerSkill skill={'accuracy'} rating={player.accuracy} />
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
  );
};

export default TeamPlayerDetail;

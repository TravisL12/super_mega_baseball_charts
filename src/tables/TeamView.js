import React from 'react';
import { useParams } from 'react-router-dom';

import { PlayerSkill } from '../PlayerCard';
import {
  StyledTeamView,
  PitchTypeContainer,
  TeamTablePlayerContainer,
  Img,
} from '../styles';
import { positionsAbbrev } from '../utilities/constants';

const TeamView = ({ teams }) => {
  const params = useParams();
  const team = teams[params.teamName];

  if (!team) {
    return <div>Loading</div>;
  }

  return (
    <StyledTeamView>
      {team.players.map((player) => (
        <TeamTablePlayerContainer key={player.name}>
          <div className="player-image">
            <Img
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
      ))}
    </StyledTeamView>
  );
};

export default TeamView;

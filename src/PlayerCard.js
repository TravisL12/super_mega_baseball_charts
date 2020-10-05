import React from 'react';
import { positionsAbbrev } from './helper';
import { PitchTypeContainer, PlayerCardContainer, SkillRating } from './styles';

const PlayerSkill = ({ skill, rating }) => {
  return (
    <div className="player-skill">
      <span>{skill}</span>
      <span>
        <SkillRating width={rating} />
      </span>
    </div>
  );
};

const PlayerCard = ({ player, close }) => {
  return (
    !!player && (
      <PlayerCardContainer className="player-modal" onClick={close}>
        <div className="player-image">
          <img src={`${process.env.PUBLIC_URL}/player_pics/${player.image}`} />
        </div>
        <div className="player-skills">
          <div className="bat-throw-pos">
            <span>Bat: {player.bats}</span>
            <span>Thr: {player.throws}</span>
            <span>S.Pos: {positionsAbbrev[player.position2]}</span>
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
          <button className="close-btn" onClick={close}>
            Close
          </button>
        </div>
      </PlayerCardContainer>
    )
  );
};

export default PlayerCard;
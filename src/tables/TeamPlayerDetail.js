import React from "react";
import { PlayerSkill } from "../PlayerSkill";
import PlayerImage from "../PlayerImage";
import { Box, PitchTypeContainer, TeamTablePlayerContainer } from "../styles";
import { IMAGES_URL } from "../utilities/constants";

const TeamPlayerDetail = ({ player, height }) => {
  return (
    <TeamTablePlayerContainer key={player.name} height={height}>
      <div className="player-image">
        <PlayerImage
          alt={`${player.name} in all ${
            player.gender === "M" ? "his" : "her"
          } glory`}
          src={`${IMAGES_URL}/player_pics/${player.image}`}
        />
      </div>
      <Box gap="10px" style={{ flex: 1 }}>
        <div className="info">
          <Box>
            <span>{player.name}</span>
          </Box>

          <Box gap="30px">
            <Box>
              <span style={{ width: "75px" }}>Bats:</span>
              <span style={{ width: "20px" }}>{player.bats}</span>
            </Box>
            <Box>
              <span style={{ width: "75px" }}>Throws:</span>
              <span style={{ width: "20px" }}>{player.throws}</span>
            </Box>
          </Box>

          <Box gap="30px">
            <Box>
              <span style={{ width: "75px" }}>Rating:</span>
              <span style={{ width: "20px" }}>{player.rating}</span>
            </Box>
            <Box>
              <span style={{ width: "75px" }}>Age:</span>
              <span style={{ width: "20px" }}>{player.age}</span>
            </Box>
          </Box>
          <br />
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
          <PlayerSkill skill={"power"} rating={player.power} />
          <PlayerSkill skill={"contact"} rating={player.contact} />
          <PlayerSkill skill={"speed"} rating={player.speed} />
          <PlayerSkill skill={"fielding"} rating={player.fielding} />
          {!player.isPitcher && (
            <PlayerSkill skill={"arm"} rating={player.arm} />
          )}
          {player.isPitcher && (
            <>
              <PlayerSkill skill={"velocity"} rating={player.velocity} />
              <PlayerSkill skill={"junk"} rating={player.junk} />
              <PlayerSkill skill={"accuracy"} rating={player.accuracy} />
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
      </Box>
    </TeamTablePlayerContainer>
  );
};

export default TeamPlayerDetail;

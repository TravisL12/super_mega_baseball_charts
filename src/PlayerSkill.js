import React from "react";
import { SCardRatingColor, SRatingValue, StyledPlayerSkill } from "./styles";

export const PlayerSkill = ({ skill, rating }) => {
  return (
    <StyledPlayerSkill>
      <span>{skill}</span>
      <div style={{ position: "relative", flex: 1, textAlign: "center" }}>
        <SCardRatingColor
          ratingColor={skill}
          style={{
            width: `${rating}%`,
          }}
        />
        <SRatingValue>{rating}</SRatingValue>
      </div>
    </StyledPlayerSkill>
  );
};

export default PlayerSkill;

import React from "react";

const PlayerTypeForm = ({ playerCounts, selectedOption, onChange }) => {
  return (
    <form className="player-type-form">
      <div className="radio">
        <label>
          <input
            type="radio"
            value="Positions"
            checked={selectedOption === "Positions"}
            onChange={onChange}
          />
          Positions ({playerCounts.positionPlayers.length})
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="Pitchers"
            checked={selectedOption === "Pitchers"}
            onChange={onChange}
          />
          Pitchers ({playerCounts.pitchers.length})
        </label>
      </div>
    </form>
  );
};

export default PlayerTypeForm;

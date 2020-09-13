import React from "react";

const PlayerTypeForm = ({ selectedOption, onChange }) => {
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
          Positions
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
          Pitchers
        </label>
      </div>
    </form>
  );
};

export default PlayerTypeForm;

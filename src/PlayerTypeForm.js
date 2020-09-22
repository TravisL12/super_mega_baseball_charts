import React from 'react';

const PlayerTypeForm = ({ playerCounts, selectedOption, onChange }) => {
  return (
    <div className="player-type-form">
      <div className="player-type">
        <input
          type="radio"
          value="Positions"
          id="positions"
          checked={selectedOption === 'Positions'}
          onChange={onChange}
        />
        <label htmlFor="positions">
          Positions ({playerCounts.positionPlayers.length})
        </label>
      </div>
      <div className="player-type">
        <input
          type="radio"
          value="Pitchers"
          id="pitchers"
          checked={selectedOption === 'Pitchers'}
          onChange={onChange}
        />
        <label htmlFor="pitchers">
          Pitchers ({playerCounts.pitchers.length})
        </label>
      </div>
      <div className="player-type">
        <input
          type="radio"
          value="Teams"
          id="teams"
          checked={selectedOption === 'Teams'}
          onChange={onChange}
        />
        <label htmlFor="teams">Teams</label>
      </div>
    </div>
  );
};

export default PlayerTypeForm;

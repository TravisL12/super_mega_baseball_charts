import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './styles';

const Header = ({ playerCounts, searchNames }) => {
  return (
    <HeaderContainer>
      <div className="player-type-nav">
        <NavLink className="player-type" exact activeClassName="active" to="/">
          Positions ({playerCounts.positionPlayers.length})
        </NavLink>

        <NavLink
          className="player-type"
          activeClassName="active"
          to="/pitchers"
        >
          Pitchers ({playerCounts.pitchers.length})
        </NavLink>

        <NavLink className="player-type" activeClassName="active" to="/teams">
          Teams
        </NavLink>
      </div>
      <input
        type="text"
        placeholder="Search Players by name"
        onChange={searchNames}
      />
    </HeaderContainer>
  );
};

export default Header;

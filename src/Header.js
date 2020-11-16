import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './styles';

const Header = ({ players, pitchers, searchNames, clearSearch, filters }) => {
  return (
    <HeaderContainer>
      <div className="player-type-nav">
        <NavLink className="player-type" exact activeClassName="active" to="/">
          Positions ({players.length})
        </NavLink>

        <NavLink
          className="player-type"
          activeClassName="active"
          to="/pitchers"
        >
          Pitchers ({pitchers.length})
        </NavLink>

        <NavLink className="player-type" activeClassName="active" to="/teams">
          Teams
        </NavLink>
      </div>
      <div className="search-input">
        <input
          type="text"
          placeholder="Search Players by name"
          value={filters.name}
          onChange={searchNames}
        />
        {filters.name && <button onClick={clearSearch}>X</button>}
      </div>
    </HeaderContainer>
  );
};

export default Header;

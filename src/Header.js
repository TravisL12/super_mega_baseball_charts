import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { HeaderContainer, NavContainer } from './styles';
import {
  HOME_ROUTE,
  PITCHERS_ROUTE,
  TEAMS_ROUTE,
  ABOUT_ROUTE,
} from './utilities/routeConstants';

const Header = ({ playerCount, searchNames, clearSearch, filters }) => {
  return (
    <HeaderContainer>
      <NavContainer>
        <NavLink
          className="nav-tab"
          exact
          activeClassName="active"
          to={HOME_ROUTE}
        >
          Positions ({playerCount.position})
        </NavLink>

        <NavLink
          className="nav-tab"
          activeClassName="active"
          to={PITCHERS_ROUTE}
        >
          Pitchers ({playerCount.pitchers})
        </NavLink>

        <NavLink className="nav-tab" activeClassName="active" to={TEAMS_ROUTE}>
          Teams
        </NavLink>
        <NavLink className="nav-tab" activeClassName="active" to={ABOUT_ROUTE}>
          About
        </NavLink>
      </NavContainer>
      <Route exact path={['/', '/pitchers']}>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search Players by name"
            value={filters.name}
            onChange={(event) => searchNames(event.target.value)}
          />
          {filters.name && <button onClick={clearSearch}>X</button>}
        </div>
      </Route>
    </HeaderContainer>
  );
};

export default Header;

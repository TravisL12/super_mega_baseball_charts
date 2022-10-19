import React from "react";
import { NavLink, Route } from "react-router-dom";
import { HeaderContainer } from "./styles";
import {
  HOME_ROUTE,
  PITCHERS_ROUTE,
  TEAMS_ROUTE,
} from "./utilities/routeConstants";

const Header = ({ playerCount, searchNames, clearSearch, filters }) => {
  return (
    <HeaderContainer>
      <div className="player-type-nav">
        <NavLink
          className="player-type"
          exact
          activeClassName="active"
          to={HOME_ROUTE}
        >
          Positions ({playerCount.position})
        </NavLink>

        <NavLink
          className="player-type"
          activeClassName="active"
          to={PITCHERS_ROUTE}
        >
          Pitchers ({playerCount.pitchers})
        </NavLink>

        <NavLink
          className="player-type"
          activeClassName="active"
          to={TEAMS_ROUTE}
        >
          Teams
        </NavLink>
      </div>
      <Route exact path={["/", "/pitchers"]}>
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

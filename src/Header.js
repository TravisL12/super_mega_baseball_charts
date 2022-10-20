import React from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import {
  HOME_ROUTE,
  PITCHERS_ROUTE,
  TEAMS_ROUTE,
} from "./utilities/routeConstants";
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({ playerCount }) => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

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

      {isAuthenticated && !isLoading ? (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </HeaderContainer>
  );
};

export default Header;

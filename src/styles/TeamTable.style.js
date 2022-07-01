import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { black, fieldingColor, speedColor } from "./colors";

export const StyledTeamTable = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 4;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 1fr;
  gap: 10px;
  padding: 0 10px;
  height: 100%;
`;

export const StyledTeamList = styled.div`
  grid-column: 1 / 3;
  grid-row: 1;
  overflow: auto;
  display: flex;
  justify-content: space-around;
`;

export const StyledTeamListItem = styled(NavLink)`
  height: 80px;
  padding: 5px;
  cursor: pointer;
  color: white;

  &:hover {
    background: ${fieldingColor};
  }
  &.active {
    background: ${speedColor};
    color: black;
  }
`;

export const StyledTeamView = styled.div`
  grid-column: 1;
  grid-row: 2;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
`;

export const StyledTeamViewPitchers = styled(StyledTeamView)`
  grid-column: 2;
  grid-row: 2;
`;

export const DetailContainer = styled.div`
  flex: 1;
  overflow: auto;
`;

export const TeamTablePlayerContainer = styled.div`
  display: flex;
  background: ${black};
  padding: 10px;
  gap: 10px;
  height: ${(props) => props.height || "200px"};

  .player-image {
    height: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    flex: 1;

    .title {
      width: 120px;
    }
  }

  .skills {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 200px;
  }
`;

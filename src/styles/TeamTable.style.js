import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { black, fieldingColor } from './colors';

export const StyledTeamTable = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 4;

  display: grid;
  grid-template-columns: 250px 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 10px;
  padding: 0 10px;
  height: 100%;
`;

export const StyledTeamList = styled.div`
  grid-column: 1;
  overflow: auto;
`;

export const StyledTeamListItem = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 5px;
  cursor: pointer;
  color: white;
  gap: 10px;

  &:hover {
    background: ${fieldingColor};
  }
  &.active {
    background: white;
    color: black;
  }
`;

export const StyledTeamView = styled.div`
  grid-column: 2;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
`;

export const StyledTeamViewPitchers = styled(StyledTeamView)`
  grid-column: 3;
`;

export const TeamTablePlayerContainer = styled.div`
  display: flex;
  text-transform: uppercase;
  background: ${black};
  padding: 10px;
  gap: 10px;
  height: 200px;

  .player-image {
    height: 100%;
  }

  .player-skills {
    display: flex;
    flex: 1;
    gap: 10px;

    .bat-throw-pos {
      display: flex;
      flex-direction: column;
    }

    .skills {
      display: flex;
      flex-direction: column;
      gap: 3px;
      flex: 1;

      .player-skill {
        display: flex;
        width: 200px;

        & > span {
          flex: 1;
        }
      }
    }
  }
`;

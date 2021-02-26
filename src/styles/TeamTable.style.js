import styled from 'styled-components';
import { black } from './colors';

export const StyledTeamTable = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 4;

  display: grid;
  grid-template-columns: 400px 1fr;
  grid-auto-rows: 1fr;
  gap: 10px;
  padding: 10px;
  height: 100%;
  overflow: auto;
`;

export const StyledTeamList = styled.div`
  grid-column: 1;
  background: ${black};
`;

export const StyledTeamBody = styled.div`
  grid-column: 2;
  background: ${black};
  height: 100%;
  overflow: auto;
`;

export const TeamTablePlayerContainer = styled.div`
  text-transform: uppercase;
  display: flex;
  background: ${black};
  padding: 10px;
  box-shadow: inset 0 0 0px 2px white;

  .player-skills {
    padding-left: 10px;

    .close-btn {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    .bat-throw-pos {
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }

    .skills {
      display: flex;
      flex-direction: column;

      .player-skill {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        & > span {
          flex: 1;
        }
      }
    }
  }
`;

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

export const StyledTeamView = styled.div`
  grid-column: 2;
  background: white;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
    img {
      max-height: 100%;
    }
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

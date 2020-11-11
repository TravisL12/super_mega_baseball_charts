import styled from 'styled-components';
import { black } from './colors';

export const PlayerCardContainer = styled.div`
  position: fixed;
  text-transform: uppercase;
  top: 100px;
  right: 20px;
  z-index: 2;
  display: flex;
  background: ${black};
  padding: 10px;
  box-shadow: inset 0 0 0px 2px white;

  .player-skills {
    width: 250px;
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

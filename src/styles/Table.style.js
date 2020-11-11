import styled from 'styled-components';
import {
  backgroundColor,
  disableGray,
  attrTipHighlight,
  speedColor,
  armColor,
  contactColor,
  fieldingColor,
  powerColor,
  accuracyColor,
  velocityColor,
  junkColor,
} from './colors';

export const TeamTableContainer = styled.div`
  .title {
    text-align: center;
  }

  .skill-tables {
    display: flex;
    flex: 1;
    justify-content: space-between;

    & > div {
      display: flex;
      width: 35%;
      justify-content: space-between;
    }

    .skill {
      display: flex;
      flex-direction: column;
    }
  }
`;

const cellPaddingTb = '7px';
const cellPaddingLr = '5px';
export const DisplayedTableContainer = styled.div`
  position: relative;
  background: ${backgroundColor};
  padding-right: 20px;
  grid-column: 2 / 3;
  grid-row: 2;
  overflow: auto;

  table {
    margin-bottom: 30px;
    padding: 10px;
    width: 100%;
    background: black;
    color: white;
    border-collapse: collapse;
  }

  .no-players {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${disableGray};
    box-shadow: inset 0 0 0px 2px black;
    width: 100%;
    height: 200px;

    p {
      margin: 0 0 10px;
    }
  }

  .header-col {
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
    position: sticky;
    background: black;
    top: 0;
    padding: ${cellPaddingTb} ${cellPaddingLr};
    z-index: 1;
    white-space: nowrap;
  }

  .header-name {
    text-align: left;
    min-width: 160px;
  }

  tr:nth-child(even) .player-col {
    background: ${disableGray};
  }

  tr:hover .player-col {
    cursor: pointer;
    background: ${armColor};
  }

  .header-col:first-child,
  .player-col:first-child {
    padding-left: 15px;
  }

  .header-team {
    display: flex;
    align-items: center;
    min-width: 100px;
    text-align: left;
  }

  .rating-value {
    position: relative;
    display: block;
    color: white;
  }

  .rating-color {
    position: absolute;
    left: ${cellPaddingLr};
    top: ${cellPaddingTb};
    height: calc(100% - (2 * ${cellPaddingTb}));
    width: calc(100% - (2 * ${cellPaddingLr}));
    background: ${powerColor};

    & + .rating-value {
      text-align: center;
    }

    &:after {
      content: '';
      position: absolute;
      right: 0;
      width: 4px;
      height: 100%;
      background: ${attrTipHighlight};
    }
  }

  .player-col {
    position: relative;
    height: 40px;
    text-align: left;
    min-width: 80px;
    box-sizing: border-box;
    font-weight: 500;
    padding: ${cellPaddingTb} ${cellPaddingLr};
    white-space: nowrap;

    &.selectedPlayer {
      background: ${powerColor} !important;
    }

    p {
      margin: 0;
    }

    &.team-col {
      text-align: center;
      overflow: hidden;
      height: 100px;

      &.team-team {
        position: relative;

        .team-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;

          &:hover {
            img {
              opacity: 1;
            }
            p {
              opacity: 0;
            }
          }

          p {
            font-size: 18px;
            z-index: 1;
            transition: 0.2s linear opacity;
          }

          img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            height: 100%;
            opacity: 0.3;
            transition: 0.2s linear opacity;
          }
        }
      }
    }

    &.player-team {
      display: flex;
      align-items: center;
      min-width: 100px;
    }
    &.player-team img {
      max-height: 100%;
      margin-right: 10px;
    }

    &.player-name {
      min-width: 160px;
    }

    .header-age,
    .header-position,
    &.player-age,
    &.player-arsenal,
    &.player-pitcherRole,
    &.player-position,
    &.player-trait,
    &.player-trait2,
    &.player-bats,
    &.player-throws,
    &.player-position2,
    &.player-gender,
    &.player-age {
      min-width: 20px;
      text-align: center;
    }

    &.player-speed .rating-color {
      background: ${speedColor};
    }
    &.player-arm .rating-color {
      background: ${armColor};
    }
    &.player-contact .rating-color {
      background: ${contactColor};
    }
    &.player-fielding .rating-color {
      background: ${fieldingColor};
    }
    &.player-power .rating-color {
      background: ${powerColor};
    }
    &.player-accuracy .rating-color {
      background: ${accuracyColor};
    }
    &.player-velocity .rating-color {
      background: ${velocityColor};
    }
    &.player-junk .rating-color {
      background: ${junkColor};
    }
  }
`;

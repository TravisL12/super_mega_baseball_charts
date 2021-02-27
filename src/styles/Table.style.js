import styled from 'styled-components';
import {
  backgroundColor,
  disableGray,
  highlightGray,
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

export const SelectionCheckbox = styled.div`
  input[type='checkbox'] {
    display: none;
  }

  label {
    cursor: pointer;
    width: 100%;

    .checkbox-label {
      display: block;
      margin: 0 auto;
      width: 25px;
      height: 25px;
      cursor: pointer;
      background: ${highlightGray};
      box-shadow: inset 0 0 0px 1px black;
      color: white;
    }
  }

  input[type='checkbox']:checked + label .checkbox-label {
    background: ${speedColor};
    box-shadow: inset 0 0 0px 1px white;

    &:after {
      content: 'x';
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
`;

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

export const PlayerColumn = styled.td`
  position: relative;
  height: 40px;
  text-align: left;
  min-width: 80px;
  box-sizing: border-box;
  font-weight: 500;
  padding: ${cellPaddingTb} ${cellPaddingLr};
  white-space: nowrap;

  .modal-link {
    color: white;
  }

  background: ${(props) =>
    props.isSelected ? `${speedColor} !important` : ''};

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

  &.player-checkbox {
    min-width: 40px;
    width: 40px;

    .rating-value {
      display: flex;
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

  min-width: ${(props) => (props.centered ? '20px' : 'none')};
  text-align: ${(props) => (props.centered ? 'center' : 'left')};

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
`;

export const PlayerColumnHeader = styled.th`
  text-transform: uppercase;
  cursor: pointer;
  position: sticky;
  background: black;
  top: 0;
  padding: ${cellPaddingTb} ${cellPaddingLr};
  z-index: 1;
  white-space: nowrap;

  min-width: ${(props) => (props.centered ? '20px' : 'none')};
  text-align: ${(props) => (props.centered ? 'center' : 'left')};

  &:first-child,
  ${PlayerColumn}:first-child {
    padding-left: 15px;
  }

  &.header-name {
    min-width: 160px;
  }

  &.header-team {
    display: flex;
    align-items: center;
    min-width: 100px;
  }
`;

const sharedTable = `
  table {
    margin-bottom: 30px;
    padding: 10px;
    width: 100%;
    background: black;
    color: white;
    border-collapse: collapse;
  }

  tr:nth-child(even) ${PlayerColumn} {
    background: ${disableGray};
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
`;

export const TeamContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 4;
  ${sharedTable}
`;

export const DisplayedTableContainer = styled.div`
  position: relative;
  background: ${backgroundColor};
  padding: 0 10px;
  grid-column: 1 / 3;
  grid-row: 3;
  overflow: auto;
  ${sharedTable}
`;
